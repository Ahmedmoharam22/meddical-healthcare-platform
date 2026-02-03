import { useQuery } from "@tanstack/react-query";
import type { Service } from "../types";
import axiosInstance from "../api/axiosInstance";


export const useServices = () => {
    return useQuery<Service[]>({
        queryKey: ['services'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/services');
            return data;
        },
    });
}