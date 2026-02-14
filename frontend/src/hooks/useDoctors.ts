import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import type { Doctor } from '../types';
import { toast } from 'react-hot-toast';

export const useDoctors = () => {
  const queryClient = useQueryClient();

  // 1. جلب كل الدكاترة
  const doctorsQuery = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/doctors');
      return data;
    },
    staleTime: 1000 * 60 * 30, // 30 دقيقة كاش
  });

  // 2. إضافة دكتور جديد
  const addDoctorMutation = useMutation({
    mutationFn: async (newDoctor: Partial<Doctor>) => {
      const { data } = await axiosInstance.post('/doctors', newDoctor, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;
    },
    onSuccess: () => {
      // تحديث الكاش فوراً عشان الجدول يتحدث لوحده
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      toast.success('تم إضافة الدكتور بنجاح');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء الإضافة');
    }
  });

  // 3. حذف دكتور
  const deleteDoctorMutation = useMutation({
    mutationFn: async (doctorId: string) => {
      await axiosInstance.delete(`/doctors/${doctorId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      toast.success('تم حذف الدكتور بنجاح');
    },
    onError: () => {
      toast.error('فشل حذف الدكتور');
    }
  });

  // 4. تعديل بيانات دكتور
  const updateDoctorMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<Doctor> }) => {
      const response = await axiosInstance.put(`/doctors/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      toast.success('تم تحديث بيانات الدكتور');
    }
  });

  return {
    ...doctorsQuery,
    addDoctor: addDoctorMutation.mutate,
    isAdding: addDoctorMutation.isPending,
    deleteDoctor: deleteDoctorMutation.mutate,
    isDeleting: deleteDoctorMutation.isPending,
    updateDoctor: updateDoctorMutation.mutate,
    isUpdating: updateDoctorMutation.isPending
  };
};

// هوك جلب الدكاترة حسب التخصص (للفلترة)
export const useDoctorsBySpecialty = (slug: string) => {
  return useQuery<Doctor[]>({
    queryKey: ['doctors', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/doctors/specialty/${slug}`);
      return data;
    },
    enabled: !!slug
  });
};

