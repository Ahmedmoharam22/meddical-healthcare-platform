import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import type { ContactInput } from '../utils/validations';


export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const response = await axiosInstance.post('/messages', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء الإرسال');
    }
  });
};


export const useMessages = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => axiosInstance.get('/messages').then(res => res.data),
  });

  const deleteMessage = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/messages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('تم حذف الرسالة');
    }
  });

  const markRead = useMutation({
    mutationFn: (id: string) => axiosInstance.put(`/messages/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  return { data, isLoading, deleteMessage: deleteMessage.mutate, markRead: markRead.mutate };
};