import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
const BASE_URL = 'http://localhost:5000/api/medicines'; 

export const useMedicines = (params = {}) => {
  const queryClient = useQueryClient();
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  // 1. جلب البيانات (GET)
  const medicinesQuery = useQuery({
    queryKey: ['medicines', params],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(BASE_URL, { 
          params,
          ...getAuthConfig() // إرسال التوكن حتى في الـ Get لو المسار محمي
        });
        return data.data; // المونجو بيرجع الداتا جوه object اسمه data
      } catch (error: any) {
        console.error("Fetch Error:", error.response?.data || error.message);
        throw error;
      }
    },
    retry: 1, // يحاول مرة واحدة كمان لو فشل
  });

  // 2. إضافة دواء جديد (POST)
  const addMutation = useMutation({
    mutationFn: (newMed: any) => 
      axiosInstance.post(BASE_URL, newMed, getAuthConfig()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تمت إضافة الدواء بنجاح في المخزن 💊');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'فشل في إضافة الدواء';
      toast.error(message);
      if (error.response?.status === 401) toast.error("برجاء تسجيل الدخول أولاً");
    }
  });

  // 3. حذف دواء (DELETE)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => 
      axiosInstance.delete(`${BASE_URL}/${id}`, getAuthConfig()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تم الحذف من النظام بنجاح');
    },
    onError: () => toast.error('عفواً، لم يتم الحذف')
  });

  // 4. تعديل دواء (PUT)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => 
      axiosInstance.put(`${BASE_URL}/${id}`, data, getAuthConfig()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تم تحديث بيانات الصنف بنجاح');
    },
    onError: () => toast.error('فشل في تحديث البيانات')
  });

  return { 
    medicinesQuery, 
    addMutation, 
    deleteMutation, 
    updateMutation 
  };
};