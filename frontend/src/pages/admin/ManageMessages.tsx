import { useMessages } from '../../hooks/useMessages';
import { Mail, Trash2, Phone, Calendar, MessageSquare } from 'lucide-react';
import { sendWhatsAppMessage } from '../../utils/whatsappService';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { useState } from 'react';

const ManageMessages = () => {
  // استخرجنا deleteMessage من الهوك بتاعك
  const { data: messages, isLoading, deleteMessage, markRead } = useMessages();
  
  // الـ State الخاص بالمودال
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) return <div className="p-10 text-center font-black">جاري تحميل الرسائل...</div>;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary">رسائل المرضى</h1>
          <p className="text-gray-400 font-bold mt-1">تواصل مع المرضى وتابع استفساراتهم</p>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-2xl text-primary font-black flex items-center gap-2">
          <MessageSquare size={20} /> {messages?.length || 0} رسالة
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages?.map((msg: any) => (
          <div 
            key={msg._id} 
            onClick={() => !msg.isRead && markRead(msg._id)} // لو مش مقروءة بس يعلم عليها
            className={`p-6 rounded-[30px] border transition-all relative overflow-hidden group cursor-pointer
              ${msg.isRead ? 'bg-white border-gray-100' : 'bg-blue-50/50 border-primary/20 shadow-md ring-1 ring-primary/10'}`}
          >
            {!msg.isRead && <span className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></span>}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-800">{msg.name}</h3>
                <p className="text-xs text-gray-400 font-bold">{msg.subject}</p>
              </div>
            </div>

            <p className="text-gray-600 font-bold text-sm leading-relaxed mb-4 line-clamp-3">
              {msg.message}
            </p>

            <div className="flex flex-col gap-2 border-t pt-4 border-gray-50 mt-auto">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                <Phone size={14} className="text-secondary" /> {msg.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                <Calendar size={14} className="text-secondary" /> {new Date(msg.createdAt).toLocaleDateString('ar-EG')}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // عشان ميعملش Mark as Read لما تدوس هنا
                  sendWhatsAppMessage({ 
                    patientName: msg.name, 
                    patientPhone: msg.phone, 
                    appointmentDate: new Date(), 
                    appointmentTime: 'استفسار' 
                  }, 'confirm');
                }} 
                className="bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer hover:shadow-lg transition-all"
              >
                رد واتساب
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // منع انتشار الحدث للـ Card
                  setDeleteId(msg._id); // افتح المودال وخزن الـ ID
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { 
          if(deleteId) {
            deleteMessage(deleteId); 
            setDeleteId(null); 
          }
        }}
        title="حذف الرسالة"
        message="هل أنت متأكد من حذف هذه الرسالة؟ سيتم إزالتها من النظام نهائياً."
        // لو الهوك بتاعك بيرجع حالة isLoading للحذف، حطها هنا
      />
    </div>
  );
};

export default ManageMessages;