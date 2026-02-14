import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور لا تقل عن 6 أحرف"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, "الاسم مطلوب"),
  secretKey: z.string().min(1, "مفتاح التسجيل مطلوب"), 
});