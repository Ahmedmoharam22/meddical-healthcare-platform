import * as z from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, "اسم الخدمة لازم يكون 3 حروف على الأقل"),
  description: z.string().min(10, "الوصف لازم يكون أطول من 10 حروف"),
  icon: z.string().optional().default('Stethoscope'),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;