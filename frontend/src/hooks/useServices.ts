import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Service } from "../types";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast"; 

export const useServices = () => {
    const queryClient = useQueryClient()

    // 1. جلب الخدمات (اللي إنت عملتها)
    const servicesQuery = useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/services');
            return data;
        },
    });

    // 2. إضافة خدمة جديدة
    const createMutation = useMutation({
        mutationFn: async (newService: Partial<Service>) => {
            const { data } = await axiosInstance.post('/services', newService);
            return data;
        },
        onSuccess: () => {
            // دي أهم حتة: بتقول لـ React Query "انسى الداتا القديمة وهات الجديدة"
            queryClient.invalidateQueries({ queryKey: ['services'] });
            toast.success('تم إضافة الخدمة بنجاح');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'فشل في إضافة الخدمة');
        }
    });

    // 3. حذف خدمة
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axiosInstance.delete(`/services/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            toast.success('تم حذف الخدمة');
        }
    });

    // 4. تعديل خدمة
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }: { id: string, updatedData: Partial<Service> }) => {
            const { data } = await axiosInstance.put(`/services/${id}`, updatedData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
            toast.success('تم تحديث الخدمة');
        }
    });

    return {
        // البيانات والحالة
        services: servicesQuery.data,
        isLoading: servicesQuery.isLoading,
        isError: servicesQuery.isError,
        
        // الأكشنز (Actions)
        createService: createMutation.mutate,
        isCreating: createMutation.isPending,
        
        deleteService: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        
        updateService: updateMutation.mutate,
        isUpdating: updateMutation.isPending
    };
}