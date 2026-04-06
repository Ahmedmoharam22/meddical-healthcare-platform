import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export const useAnalytics = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => axiosInstance.get('/stats/dashboard').then(res => res.data)
  });
};