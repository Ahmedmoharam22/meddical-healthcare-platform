import { AlertTriangle, Loader2 } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative z-10 p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
          <AlertTriangle size={40} />
        </div>
        <h3 className="text-2xl font-black text-primary mb-2">{title}</h3>
        <p className="text-gray-500 font-bold mb-8">{message}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black cursor-pointer">إلغاء</button>
          <button onClick={onConfirm} disabled={isLoading} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-200">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'تأكيد الحذف'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;