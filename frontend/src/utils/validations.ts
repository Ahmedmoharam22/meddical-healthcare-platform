import { z } from 'zod';

export const appointmentSchema = z.object({
  patientName: z.string().min(6, "الاسم يجب أن يكون 6 أحرف على الأقل"),
  patientEmail: z.string().email("البريد الإلكتروني غير صحيح"),
  patientPhone: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف المصري غير صحيح"),
  doctor: z.string().min(1, "يرجى اختيار الطبيب"),
  Specialty: z.string().min(1, "يرجى اختيار القسم"),
  appointmentDate: z.string().min(1, "يرجى اختيار التاريخ"),
  appointmentTime: z.string().min(1, "يرجى اختيار الوقت"),
  message: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;



export const contactSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'), // ضيف ده
  subject: z.string().min(5, 'الموضوع قصير جداً'),
  message: z.string().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل'),
});
export type ContactInput = z.infer<typeof contactSchema>;