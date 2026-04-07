// import React from 'react';
// import { X, BookOpen, Award, Calendar } from 'lucide-react';

// interface DoctorModalProps {
//   doctor: any;
//   onClose: () => void;
// }

// const DoctorModal = ({ doctor, onClose }: DoctorModalProps) => {
//   if (!doctor) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] relative shadow-2xl flex flex-col md:flex-row">
        
//         {/* زر القفل */}
//         <button 
//           onClick={onClose}
//           className="absolute top-6 left-6 z-10 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer"
//         >
//           <X size={24} />
//         </button>

//         {/* جانب الصورة */}
//         <div className="md:w-2/5 h-[300px] md:h-auto relative">
//           <img 
//             src={`http://localhost:5000/uploads/${doctor.image}`} 
//             className="w-full h-full object-cover" 
//             alt={doctor.name} 
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary text-white">
//             <h2 className="text-2xl font-bold">{doctor.name}</h2>
//             <p className="text-accent font-medium">
//               {typeof doctor.specialty === 'object' ? doctor.specialty.name : doctor.specialty}
//             </p>
//           </div>
//         </div>

//         {/* جانب التفاصيل */}
//         <div className="md:w-3/5 p-8 md:p-12">
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4 text-secondary">
//               <BookOpen size={24} />
//               <h3 className="text-xl font-bold text-primary">نبذة عن الطبيب</h3>
//             </div>
//             <p className="text-gray-600 leading-relaxed text-lg">
//               {doctor.bio || "هذا الطبيب متخصص في تقديم أفضل الرعاية الطبية في مجاله، وله خبرة واسعة في علاج الحالات المعقدة باستخدام أحدث التقنيات."}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 border border-gray-100">
//               <Award className="text-secondary" size={32} />
//               <div>
//                 <h4 className="font-bold text-primary text-sm">الدرجة العلمية</h4>
//                 <p className="text-gray-500 text-sm">{doctor.title || 'استشاري مجمع النور'}</p>
//               </div>
//             </div>
//             <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 border border-gray-100">
//               <Calendar className="text-secondary" size={32} />
//               <div>
//                 <h4 className="font-bold text-primary text-sm">مواعيد العمل</h4>
//                 <p className="text-gray-500 text-sm">
//                    {doctor.schedule?.[0]?.day || 'متوفر حالياً'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button 
//             onClick={() => {
//               onClose();
//               const contactSection = document.getElementById('contact');
//               if(contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
//             }}
//             className="mt-10 w-full py-5 bg-secondary text-white font-black rounded-2xl hover:bg-primary transition-all shadow-lg shadow-secondary/20 cursor-pointer"
//           >
//             احجز موعد الآن مع الدكتور
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorModal;

import { useEffect } from "react";
import { X, Award, Info } from "lucide-react";
import BookingForm from "../BookingForm";

interface DoctorModalProps {
  doctor: any;
  onClose: () => void;
}

const DoctorModal = ({ doctor, onClose }: DoctorModalProps) => {
  useEffect(() => {
    if (doctor) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [doctor]);

  if (!doctor) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-primary/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose} // يقفل المودال لو داس بره
    >
      <div 
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] md:rounded-[60px] shadow-2xl relative animate-in zoom-in duration-300 
                   scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()} // يمنع قفل المودال لو داس جواه
      >
        
        {/* زر الإغلاق - مثبت (Fixed) بالنسبة للمودال عشان يسهل الوصول له */}
        <button 
          onClick={onClose} 
          className="absolute top-6 left-6 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full transition-all z-[110] cursor-pointer shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* الجزء الأيمن: تفاصيل الطبيب (Responsive) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right border-b lg:border-b-0 lg:border-l border-gray-100 pb-8 lg:pb-0 lg:pl-12">
              <div className="relative mb-8">
                <img 
                  src={`http://localhost:5000/uploads/${doctor.image}`} 
                  className="w-44 h-44 md:w-56 md:h-56 rounded-[40px] md:rounded-[55px] object-cover border-[10px] border-site-bg shadow-xl"
                  alt={doctor.name}
                  loading="lazy"
                />
                <div className="absolute -bottom-4 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-4 bg-secondary text-white px-6 py-2 rounded-2xl text-sm font-black shadow-lg flex items-center gap-2">
                  <Award size={18} />
                  <span>مميز</span>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight">{doctor.name}</h2>
                <p className="text-secondary font-black text-xl">{doctor.specialty?.name}</p>
              </div>

              <div className="bg-gray-50 p-6 md:p-8 rounded-[35px] relative group w-full">
                <Info className="absolute top-4 left-4 text-gray-200 group-hover:text-secondary transition-colors" size={24} />
                <p className="text-gray-500 font-bold leading-relaxed text-md md:text-lg">
                  {doctor.bio || "استشاري متميز بمجمع النور الطبي، متخصص في تقديم الرعاية الصحية الشاملة باستخدام أحدث البروتوكولات العلاجية العالمية."}
                </p>
              </div>
            </div>

            {/* الجزء الأيسر: فورم الحجز والدفع */}
            <div className="lg:col-span-7 pt-4 lg:pt-0">
              <div className="mb-8">
                <h4 className="text-2xl font-black text-primary mb-2">إتمام الحجز</h4>
                <p className="text-gray-400 font-bold">يرجى ملء البيانات التالية لتأكيد موعدك</p>
              </div>
              
              <BookingForm 
                doctorId={doctor._id}
                specialtyId={doctor.specialty?._id}
                specialtyName={doctor.specialty?.name}
                price={doctor.specialty?.price || 60}
              />
            </div>

          </div>
        </div>
      </div>

      {/* تنسيق الـ Scrollbar الخاص بالمودال */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #00D1FF; 
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #0099cc;
        }
      `}</style>
    </div>
  );
};

export default DoctorModal;