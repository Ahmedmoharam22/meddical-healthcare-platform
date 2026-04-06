import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useDashboardStats = () =>
  useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => axiosInstance.get('/stats/dashboard').then(res => res.data),
  });