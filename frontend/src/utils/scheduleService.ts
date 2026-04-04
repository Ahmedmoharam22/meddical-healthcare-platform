import { z } from "zod";

export const scheduleSchema = z.object({
  doctor: z.string().min(1, "يجب اختيار طبيب"),
  day: z.enum(["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]),
  startTime: z.string().min(1, "وقت البدء مطلوب"),
  endTime: z.string().min(1, "وقت الانتهاء مطلوب"),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;