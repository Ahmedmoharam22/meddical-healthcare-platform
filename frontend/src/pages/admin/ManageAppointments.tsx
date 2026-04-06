

import { useState } from 'react';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { useAppointments } from '../../hooks/useAppointments';
import { MessageCircle, CheckCircle, XCircle, Trash2, User, Calendar as CalendarIcon, Phone } from 'lucide-react';
import AdminLoader from '../../components/dashboard/AdminLoader';
import { sendWhatsAppMessage } from '../../utils/whatsappService';

const ManageAppointments = () => {
  const { data: appointments, isLoading, updateStatus, deleteAppointment } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  // فانكشن لفتح المودال وتخزين الـ ID
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  if (isLoading) return <AdminLoader label="جاري تحميل المواعيد..." />;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary">إدارة الحجوزات</h1>
          <p className="text-gray-400 font-bold mt-1">تابع مواعيد المرضى وحالة الحجز اليومية</p>
        </div>
        <div className="bg-secondary/10 px-6 py-3 rounded-2xl text-secondary font-black">
          إجمالي الحجوزات: {appointments?.length || 0}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[35px] shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-black text-sm uppercase">
              <th className="p-6">المريض</th>
              <th className="p-6">التواصل</th>
              <th className="p-6">الموعد</th>
              <th className="p-6">الطبيب المختص</th>
              <th className="p-6">الحالة</th>
              <th className="p-6 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments?.map((app: any) => (
              <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                      <User size={20} />
                    </div>
                    <span className="font-black text-primary">{app.patientName}</span>
                  </div>
                </td>
                <td className="p-6 font-bold text-gray-600 italic">
                  <div className="flex items-center gap-1 font-mono tracking-tighter">
                    <Phone size={14} className="text-secondary" /> {app.patientPhone}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-black text-primary flex items-center gap-2">
                      <CalendarIcon size={16} className="text-secondary" /> {new Date(app.appointmentDate).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="text-xs font-bold text-gray-400 mr-6">{app.appointmentTime}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-black">
                    د. {app.doctor?.name || 'غير محدد'}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${getStatusStyle(app.status)}`}>
                    {app.status === 'confirmed' ? 'مؤكد' : app.status === 'cancelled' ? 'ملغي' : 'قيد الانتظار'}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => updateStatus({ id: app._id, status: 'confirmed' })} 
                      className="p-2 text-green-600 hover:bg-green-100 rounded-xl transition-all cursor-pointer"
                      disabled={app.status === 'confirmed'}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      onClick={() => updateStatus({ id: app._id, status: 'cancelled' })} 
                      className="p-2 text-amber-600 hover:bg-amber-100 rounded-xl transition-all cursor-pointer"
                      disabled={app.status === 'cancelled'}
                    >
                      <XCircle size={20} />
                    </button>
                    {/* التعديل هنا: بننادي handleDeleteClick */}
                    <button 
                      onClick={() => handleDeleteClick(app._id)} 
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={() => sendWhatsAppMessage(app, 'confirm')}    
                      className=" cursor-pointer p-2 text-[#25D366] hover:bg-green-50 rounded-xl transition-all"
                      title="إرسال واتساب"
                    >
                      <MessageCircle size={20} />
                    </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الـ Modal مكانه الصح هنا بره الجدول */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId('');
        }}
        onConfirm={() => {
          deleteAppointment(selectedId);
          setIsModalOpen(false);
        }}
        title="تأكيد حذف الحجز"
        message="هل أنت متأكد من حذف هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء."
      />
    </div>
  );
};

export default ManageAppointments;