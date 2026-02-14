import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (appointmentData: any) => {
      const { data } = await axiosInstance.post('/appointments', appointmentData);
      return data;
    },
    onSuccess: () => {
      toast.success('تم استلام طلب الحجز بنجاح! سنتواصل معك قريباً.');
    },
    onError: (error: any) => {
   toast.error(error.response?.data?.message || 'حدث خطأ أثناء الحجز');
    }
  });
}


export const useAppointments = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/appointments');
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      axiosInstance.put(`/appointments/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('تم تحديث حالة الحجز');
    }
  });

  const deleteAppointment = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/appointments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.error('تم حذف الحجز');
    }
  });

  return { data, isLoading, updateStatus: updateStatus.mutate, deleteAppointment: deleteAppointment.mutate };
};