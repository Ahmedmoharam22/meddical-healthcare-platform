import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

export const usePharmacy = (filters = {}) => {
  const queryClient = useQueryClient();

  // 1. جلب كل الأدوية (مع دعم الفلترة الذكية والـ Low Stock)
  const { data: medicines, isLoading, isError, refetch } = useQuery({
    queryKey: ['medicines', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/pharmacy', { params: filters });
      return data.data; // بناءً على الـ Response اللي بعته (data.data)
    },
  });

  // 2. إضافة دواء جديد
  const addMedicineMutation = useMutation({
    mutationFn: async (newMed: any) => {
      const { data } = await axiosInstance.post('/pharmacy', newMed);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تمت إضافة الصنف للمستودع بنجاح ✅');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'فشل في إضافة الدواء');
    }
  });

  // 3. تحديث الكمية (بيع أو توريد)
  const updateStockMutation = useMutation({
    mutationFn: async ({ id, quantityChange }: { id: string, quantityChange: number }) => {
      const { data } = await axiosInstance.patch(`/pharmacy/stock/${id}`, { quantityChange });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تم تحديث المخزون بنجاح 📦');
    },
    onError: (error: any) => {
      toast.error('حدث خطأ أثناء تحديث الكمية');
    }
  });

  // 4. مسح دواء
  const deleteMedicineMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/pharmacy/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      toast.success('تم حذف الصنف نهائياً');
    },
    onError: () => {
      toast.error('فشل في حذف الصنف');
    }
  });

  return {
    medicines,
    isLoading,
    isError,
    refetch,
    addMedicine: addMedicineMutation.mutate,
    isAdding: addMedicineMutation.isPending,
    updateStock: updateStockMutation.mutate,
    isUpdating: updateStockMutation.isPending,
    deleteMedicine: deleteMedicineMutation.mutate,
  };
};