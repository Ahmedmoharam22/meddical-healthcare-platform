import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/blogs');
      return data;
    },
  });

  const addBlog = useMutation({
    mutationFn: (formData: FormData) => axiosInstance.post('/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('تم نشر المقال بنجاح');
    }
  });

  const updateBlog = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      axiosInstance.put(`/blogs/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('تم تعديل المقال');
    }
  });

  const deleteBlog = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.error('تم حذف المقال');
    }
  });

  return {
    data,
    isLoading,
    addBlog: addBlog.mutate,
    isAdding: addBlog.isPending,
    updateBlog: updateBlog.mutate,
    isUpdating: updateBlog.isPending,
    deleteBlog: deleteBlog.mutate,
    isDeleting: deleteBlog.isPending
  };
};
export const useSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/blogs/${id}`);
      return data;
    },
    enabled: !!id, // ميعملش ريكويست لو الـ ID مش موجود
  });
};