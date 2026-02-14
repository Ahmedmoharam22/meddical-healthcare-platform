import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
import type { Specialty } from '../types';

export const useSpecialties = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/specialties');
      return data;
    }
  });

  const addSpecialty = useMutation({
    mutationFn: (newSpec: any) => axiosInstance.post('/specialties', newSpec),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.success('تم إضافة التخصص بنجاح');
    }
  });

  const deleteSpecialty = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/specialties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.error('تم حذف التخصص');
    }
  });

  return { data, isLoading, addSpecialty, deleteSpecialty };
};