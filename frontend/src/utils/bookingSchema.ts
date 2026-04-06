import { z } from "zod";

export const bookingSchema = z.object({
  patientName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  patientPhone: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح (نمط مصري)"),
  paymentMethod: z.enum(["online", "on_site"]),
  appointmentDate: z.string().min(1, "يرجى اختيار موعد الكشف"),  
});

export type BookingFormData = z.infer<typeof bookingSchema>;