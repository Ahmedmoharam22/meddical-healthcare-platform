import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import type { BookingPayload } from "../types";


export const useCreateBooking = (stripe?: any, elements?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingPayload) => {
      const { data } = await axiosInstance.post("/bookings/create", bookingData);
      return data;
    },
    onSuccess: async (data, variables) => {
      // 1. لو المريض اختار دفع أونلاين، الباك إند باعت لنا "clientSecret"
      if (data.success && data.clientSecret) {
        if (!stripe || !elements) {
          toast.error("Stripe is not initialized");
          return;
        }
        
        // Use a generic way to access CardElement instead of importing it here if possible. 
        // Wait, CardElement needs to be imported or queried. Actually, `elements.getElement('card')` also works.
        const cardElement = elements.getElement('card'); // using string 'card' is valid in stripe elements
        if (!cardElement) return;

        toast.loading("جاري تأكيد الدفع...", { id: "payment-toast" });

        const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: variables.patientName,
              phone: variables.patientPhone,
            }
          }
        });

        if (error) {
          toast.error(error.message || "فشل الدفع", { id: "payment-toast" });
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          toast.success("تم الدفع والحجز بنجاح!", { id: "payment-toast" });
          queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
        }
      } 
      
      // 2. لو المريض اختار دفع في المجمع (On Site)
      else if (data.success) {
        toast.success("تم الحجز بنجاح! ننتظرك في المجمع الطبي.");
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "حدث خطأ أثناء إتمام الحجز";
      toast.error(message, { id: "payment-toast" });
      console.error("Booking Mutation Error:", error);
    },
  });
};
