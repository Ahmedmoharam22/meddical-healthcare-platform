import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Loader2, Save } from "lucide-react";
import { useDoctors } from "../../hooks/useDoctors";
import { useSchedule } from "../../hooks/useSchedule";
import { scheduleSchema, ScheduleFormValues } from "../../utils/scheduleService";
import { useEffect } from "react";

interface Props {
  editingSchedule?: any; 
  onFinished?: () => void; 
}

const ScheduleForm = ({ editingSchedule, onFinished }: Props) => {
  const { data: doctors } = useDoctors(); 
  const { createSchedule, updateSchedule } = useSchedule(); 

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });

  useEffect(() => {
    if (editingSchedule) {
      reset({
        doctor: editingSchedule.doctor._id || editingSchedule.doctor,
        day: editingSchedule.day,
        startTime: editingSchedule.startTime,
        endTime: editingSchedule.endTime,
      });
    }
  }, [editingSchedule, reset]);

  const onSubmit = async (data: ScheduleFormValues) => {
    if (editingSchedule) {
      await updateSchedule({ id: editingSchedule._id, data });
    } else {
      await createSchedule(data);
    }
    reset();
    if (onFinished) onFinished();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 mb-10 transition-all duration-300">
      <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
        {editingSchedule ? <Save className="text-blue-500" /> : <PlusCircle className="text-secondary" />}
        {editingSchedule ? "تعديل الميعاد الحالي" : "إضافة ميعاد جديد"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* اختيار الدكتور */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm text-gray-600">الطبيب</label>
          <select {...register("doctor")} className="p-3 bg-site-bg rounded-xl border-none">
            <option value="">اختر الدكتور...</option>
            {doctors?.map((doc: any) => <option key={doc._id} value={doc._id}>{doc.name}</option>)}
          </select>
          {errors.doctor && <span className="text-red-500 text-xs font-bold">{errors.doctor.message}</span>}
        </div>

        {/* اختيار اليوم */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm text-gray-600">اليوم</label>
          <select {...register("day")} className="p-3 bg-site-bg rounded-xl border-none">
            {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* المواعيد */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm text-gray-600">من</label>
          <input type="text" placeholder="4 م" {...register("startTime")} className="p-3 bg-site-bg rounded-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm text-gray-600">إلى</label>
          <input type="text" placeholder="7 م" {...register("endTime")} className="p-3 bg-site-bg rounded-xl" />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          disabled={isSubmitting}
          className={`px-10 py-3 rounded-xl font-black text-white transition-all flex items-center gap-2 cursor-pointer ${editingSchedule ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary hover:bg-secondary'}`}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : editingSchedule ? "تحديث الميعاد" : "حفظ الميعاد"}
        </button>
        
        {editingSchedule && (
          <button type="button" onClick={() => { reset(); if (onFinished) onFinished(); }} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold">إلغاء التعديل</button>
        )}
      </div>
    </form>
  );
};


export default ScheduleForm;