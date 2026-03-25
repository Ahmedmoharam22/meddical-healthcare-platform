// src/components/WhatsAppButton.tsx
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "01092635055"; // رقم مجمع النور
  const message = "السلام عليكم، أريد الاستفسار عن المواعيد المتاحة.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-0 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip يظهر عند الهوفر */}
      <span className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100">
        تحدث معنا الآن
      </span>
      
      <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 relative">
        <MessageCircle size={30} fill="currentColor" />
        {/* تأثير النبض (Ping) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </div>
    </a>
  );
};

export default WhatsAppButton;