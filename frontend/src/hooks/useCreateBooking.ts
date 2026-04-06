import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import type { BookingPayload } from "../types";


export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingPayload) => {
      const { data } = await axiosInstance.post("/bookings/create", bookingData);
      return data;
    },
    onSuccess: (data) => {
      // 1. لو المريض اختار دفع أونلاين، الباك إند باعت لنا "url"
      if (data.success && data.url) {
        toast.loading("جاري تحويلك لصفحة الدفع الآمنة...");
        // تحويل المتصفح بالكامل لصفحة Stripe Checkout
        window.location.href = data.url;
      } 
      
      // 2. لو المريض اختار دفع في المجمع (On Site)
      else if (data.success) {
        toast.success("تم الحجز بنجاح! ننتظرك في المجمع الطبي.");
        // عمل Refresh لأي بيانات حجوزات قديمة لو موجودة
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "حدث خطأ أثناء إتمام الحجز";
      toast.error(message);
      console.error("Booking Mutation Error:", error);
    },
  });
};