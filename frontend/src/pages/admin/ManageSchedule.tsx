// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PlusCircle, Loader2 } from "lucide-react";
// import { useDoctors } from "../../hooks/useDoctors";
// import { useSchedule } from "../../hooks/useSchedule";
// import { scheduleSchema, ScheduleFormValues } from "../../utils/scheduleService";

// const ScheduleForm = () => {
//   const { data:doctors } = useDoctors(); 
//   const { createSchedule } = useSchedule(); 

//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ScheduleFormValues>({
//     resolver: zodResolver(scheduleSchema),
//   });

//   const onSubmit = async (data: ScheduleFormValues) => {
//     await createSchedule(data);  
//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 mb-10">
//       <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
//         <PlusCircle className="text-secondary" /> إضافة ميعاد جديد
//       </h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* اختيار الدكتور */}
//         <div className="flex flex-col gap-2">
//           <label className="font-bold text-sm text-gray-600">الطبيب</label>
//           <select {...register("doctor")} className="p-3 bg-site-bg rounded-xl border-none focus:ring-2 focus:ring-secondary">
//             <option value="">اختر الدكتور...</option>
//             {doctors?.map(doc => <option key={doc._id} value={doc._id}>{doc.name}</option>)}
//           </select>
//           {errors.doctor && <span className="text-red-500 text-xs">{errors.doctor.message}</span>}
//         </div>

//         {/* اختيار اليوم */}
//         <div className="flex flex-col gap-2">
//           <label className="font-bold text-sm text-gray-600">اليوم</label>
//           <select {...register("day")} className="p-3 bg-site-bg rounded-xl border-none">
//             {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map(day => (
//               <option key={day} value={day}>{day}</option>
//             ))}
//           </select>
//         </div>

//         {/* وقت البدء */}
//         <div className="flex flex-col gap-2">
//           <label className="font-bold text-sm text-gray-600">من (وقت البدء)</label>
//           <input type="text" placeholder="مثلاً: 4 م" {...register("startTime")} className="p-3 bg-site-bg rounded-xl" />
//         </div>

//         {/* وقت الانتهاء */}
//         <div className="flex flex-col gap-2">
//           <label className="font-bold text-sm text-gray-600">إلى (وقت الانتهاء)</label>
//           <input type="text" placeholder="مثلاً: 7 م" {...register("endTime")} className="p-3 bg-site-bg rounded-xl" />
//         </div>
//       </div>

//       <button 
//         disabled={isSubmitting}
//         className="mt-8 bg-primary cursor-pointer text-white px-10 py-3 rounded-xl font-bold hover:bg-secondary transition-all flex items-center gap-2"
//       >
//         {isSubmitting ? <Loader2 className="animate-spin" /> : "حفظ الميعاد في الجدول"}
//       </button>
//     </form>
//   );
// };

// export default ScheduleForm;





import { useState } from "react";
import ScheduleTable from "../../components/common/ScheduleTable";
import ScheduleForm from "../../components/forms/ScheduleForm";
const ManageSchedule = () => {
  // State عشان نشيل بيانات الميعاد اللي عايزين نعدله
  const [editingSchedule, setEditingSchedule] = useState<any>(null);

  return (
    <div className="p-8 font-cairo" dir="rtl">
      <h1 className="text-3xl font-black text-primary mb-8">إدارة جدول المواعيد</h1>

      {/* 1. الفورم: بنبعت لها الميعاد المختار لو موجود */}
      <ScheduleForm  
        editingSchedule={editingSchedule} 
        onFinished={() => setEditingSchedule(null)} 
      />

      <hr className="my-10 border-gray-100" />

      {/* 2. الجدول: بنبعت له فنكشن التعديل عشان لما يدوس "تعديل" يبعت البيانات لفوق */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-600">المواعيد الحالية</h2>
        <ScheduleTable onEdit={(item) => setEditingSchedule(item)} />
      </div>
    </div>
  );
};

export default ManageSchedule;