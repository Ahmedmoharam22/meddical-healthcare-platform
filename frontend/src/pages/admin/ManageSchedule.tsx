


import { useState } from "react";
import ScheduleTable from "../../components/common/ScheduleTable";
import ScheduleForm from "../../components/forms/ScheduleForm";
import AdminLoader from "../../components/dashboard/AdminLoader";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
const ManageSchedule = () => {
  // State عشان نشيل بيانات الميعاد اللي عايزين نعدله
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: () => axiosInstance.get('/schedules').then(res => res.data)
  });

  if (isLoading) return <AdminLoader label="جاري تحميل جدول المواعيد..." />;
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