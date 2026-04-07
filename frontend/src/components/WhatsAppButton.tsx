// // src/components/WhatsAppButton.tsx
// import { MessageCircle } from 'lucide-react';

// const WhatsAppButton = () => {
//   const phoneNumber = "01092635055"; 
//   const message = "السلام عليكم، أريد الاستفسار عن المواعيد المتاحة.";
  
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <a
//       href={whatsappUrl}
//       target="_blank"
//       rel="noreferrer"
//       className="fixed bottom-8 right-0 z-50 flex items-center gap-3 group"
//     >
//       {/* Tooltip يظهر عند الهوفر */}
//       <span className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100">
//         تحدث معنا الآن
//       </span>
      
//       <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 relative">
//         <MessageCircle size={30} fill="currentColor" />
//         {/* تأثير النبض (Ping) */}
//         <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
//       </div>
//     </a>
//   );
// };

// export default WhatsAppButton;



import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingChat = () => {
  const whatsappNumber = "01092635055"; // رقم المجمع الدولي
  const message = "السلام عليكم، أريد الاستفسار عن مواعيد العيادات في مجمع النور.";

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[999] group">
      {/* Tooltip - بيظهر لما تقرب الماوس */}
      <span className="absolute bottom-full right-0 mb-4 w-48 bg-white text-primary text-sm font-bold p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center border border-gray-100">
        تواصل معنا عبر واتساب 💬
      </span>

      {/* زر الشات */}
      <button
        onClick={handleClick}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer animate-bounce-slow"
      >
        <MessageCircle size={32} fill="currentColor" />
        
        {/* النقطة الحمراء (إشعار وهمي لفت الانتباه) */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
};

export default FloatingChat;