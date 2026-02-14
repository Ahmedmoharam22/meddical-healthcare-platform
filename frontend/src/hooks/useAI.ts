import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useSymptomChecker = () => {
  return useMutation({
    mutationFn: async (symptoms: string) => {
      const { data } = await axiosInstance.post('/ai/analyze', { symptoms });
      return data;
    }
  });
};