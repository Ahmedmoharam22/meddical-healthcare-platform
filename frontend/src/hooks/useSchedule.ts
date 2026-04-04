import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export const useSchedule = (day?: string) => {
  const queryClient = useQueryClient();

  // 1. جلب المواعيد (القراءة)
  const query = useQuery({
    queryKey: ["schedules", day],
    queryFn: async () => {
      // If we only want specific day, pass it, otherwise pass empty to get all
      const params = day ? { day } : {};
      const { data } = await axiosInstance.get(`/schedules`, { params });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
    // 2. إضافة ميعاد جديد (الكتابة) - ده اللي كان ناقصك!
  const createMutation = useMutation({
    mutationFn: async (newSchedule: any) => {
      const { data } = await axiosInstance.post("/schedules", newSchedule);
      return data;
    },
    onSuccess: () => {
      // دي بتخلي الجدول يتحدث فوراً أول ما تضيف
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("تم إضافة الميعاد بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "فشل في إضافة الميعاد");
    }
  });
  // 3. حذف ميعاد
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/schedules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("تم حذف الميعاد");
    }
  });
  // 4. تعديل ميعاد
  const updateMutation = useMutation({
  mutationFn: async ({ id, data }: { id: string; data: any }) => {
    const response = await axiosInstance.put(`/schedules/${id}`, data);
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["schedules"] });
    toast.success("تم تحديث الميعاد بنجاح");
  }
});
  return {
    schedules: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    // بنرجع الـ mutate ونسميها الاسم اللي الفورم مستنياه
    createSchedule: createMutation.mutateAsync, 
    isCreating: createMutation.isPending,
    deleteSchedule: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    updateSchedule: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};