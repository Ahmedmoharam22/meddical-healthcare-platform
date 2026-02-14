import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import type { Service } from '../types';

export const useSingleService = (slug: string | undefined) => {
  return useQuery<Service>({
    queryKey: ['service', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/services/${slug}`);
      return data;
    },
    enabled: !!slug, 
  });
};