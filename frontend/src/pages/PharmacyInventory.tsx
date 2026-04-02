// import React, { useState } from 'react';
// import { 
//    Search, Plus, AlertTriangle, 
//   Trash2, Plus as StockPlus, Minus as StockMinus,
//   Loader2, Inbox,
//   Pilcrow
// } from 'lucide-react';
// import { usePharmacy } from '../hooks/usePharmacy';

// const PharmacyInventory = () => {
//   // 1. States & Hooks
//   const [showLowStock, setShowLowStock] = useState(false);
//   const { 
//     medicines, isLoading, isError, 
//     updateStock, deleteMedicine 
//   } = usePharmacy(showLowStock ? { lowStock: 'true' } : {});

//   // 2. Logic Helpers
//   const getExpiryStatus = (date: string) => {
//     const diff = (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30);
//     if (diff < 0) return { label: 'منتهي', color: 'bg-slate-900 text-white' };
//     if (diff <= 3) return { label: 'قرب ينتهي', color: 'bg-amber-100 text-amber-700' };
//     return { label: 'سليم', color: 'bg-emerald-100 text-emerald-700' };
//   };

//   if (isError) return <div className="p-10 text-center text-red-500 font-bold">حدث خطأ أثناء جلب البيانات.. تأكد من اتصال السيرفر.</div>;

//   return (
//     <div className="p-6 bg-[#f8fafc] min-h-screen font-sans" dir="rtl">
      
//       {/* --- Header & Actions --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
//             <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm">
//               < Pilcrow size={32} />
//             </div>
//             المستودع الطبي (SANG Logistics)
//           </h1>
//           <p className="text-slate-500 mt-2 mr-14 font-medium">إدارة المخزون الاستراتيجي وتتبع الصلاحية</p>
//         </div>
        
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setShowLowStock(!showLowStock)}
//             className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all border-2 
//               ${showLowStock ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-100 text-slate-600 hover:border-primary'}`}
//           >
//             <AlertTriangle size={20} />
//             {showLowStock ? 'عرض الكل' : 'عرض النواقص فقط'}
//           </button>
          
//           <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
//             <Plus size={20} />
//             إضافة صنف
//           </button>
//         </div>
//       </div>

//       {/* --- Main Content Area --- */}
//       <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        
//         {/* Search Bar */}
//         <div className="p-6 border-b border-slate-50 bg-slate-50/30">
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
//             <input 
//               type="text" 
//               placeholder="بحث باسم الدواء أو الباركود..."
//               className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3.5 pr-5 pl-12 outline-none focus:border-primary transition-all font-medium"
//             />
//           </div>
//         </div>

//         {/* Inventory Table */}
//         <div className="overflow-x-auto">
//           {isLoading ? (
//             <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
//               <Loader2 className="animate-spin text-primary" size={40} />
//               <p className="font-bold">جاري فحص المستودع...</p>
//             </div>
//           ) : medicines?.length === 0 ? (
//             <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4 text-center">
//               <Inbox size={64} strokeWidth={1} />
//               <p className="font-bold text-lg">لا توجد أدوية مسجلة حالياً</p>
//             </div>
//           ) : (
//             <table className="w-full text-right border-collapse">
//               <thead>
//                 <tr className="bg-slate-50/50 border-b border-slate-100">
//                   <th className="p-5 text-slate-500 font-bold text-sm">اسم الصنف / العلمي</th>
//                   <th className="p-5 text-slate-500 font-bold text-sm text-center">التصنيف</th>
//                   <th className="p-5 text-slate-500 font-bold text-sm text-center">الكمية الحالية</th>
//                   <th className="p-5 text-slate-500 font-bold text-sm text-center">الصلاحية</th>
//                   <th className="p-5 text-slate-500 font-bold text-sm text-center">الموقع (الرف)</th>
//                   <th className="p-5 text-slate-500 font-bold text-sm text-center">إجراءات</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {medicines.map((med: any) => {
//                   const expiry = getExpiryStatus(med.expiryDate);
//                   const isLow = med.stock <= (med.minThreshold || 10);

//                   return (
//                     <tr key={med._id} className="hover:bg-slate-50/30 transition-colors group">
//                       <td className="p-5">
//                         <div className="font-black text-slate-800 text-lg">{med.name}</div>
//                         <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">{med.genericName || 'Generic'}</div>
//                       </td>
//                       <td className="p-5 text-center">
//                         <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-xl text-xs font-black">
//                           {med.category}
//                         </span>
//                       </td>
//                       <td className="p-5 text-center">
//                         <div className={`inline-flex flex-col items-center min-w-[80px] px-3 py-2 rounded-2xl border transition-all ${isLow ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
//                           <span className="text-xl font-black">{med.stock}</span>
//                           <span className="text-[10px] font-black">{isLow ? 'نواقص!' : 'متوفر'}</span>
//                         </div>
//                       </td>
//                       <td className="p-5 text-center">
//                         <span className={`px-4 py-2 rounded-xl text-[11px] font-black border ${expiry.color} border-current/10`}>
//                           {new Date(med.expiryDate).toLocaleDateString('ar-EG')} ({expiry.label})
//                         </span>
//                       </td>
//                       <td className="p-5 text-center font-mono font-black text-slate-400 group-hover:text-primary transition-colors">
//                         {med.shelfLocation || 'N/A'}
//                       </td>
//                       <td className="p-5">
//                         <div className="flex items-center justify-center gap-2">
//                           {/* توريد */}
//                           <button 
//                             onClick={() => updateStock({ id: med._id, quantityChange: 10 })}
//                             className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-xl transition-all"
//                             title="توريد شحنة (+10)"
//                           >
//                             <StockPlus size={20} />
//                           </button>
//                           {/* صرف */}
//                           <button 
//                             onClick={() => updateStock({ id: med._id, quantityChange: -1 })}
//                             className="p-2 hover:bg-amber-50 text-amber-500 rounded-xl transition-all"
//                             title="صرف علبة (-1)"
//                           >
//                             <StockMinus size={20} />
//                           </button>
//                           {/* حذف */}
//                           <button 
//                             onClick={() => { if(confirm('هل أنت متأكد من الحذف؟')) deleteMedicine(med._id); }}
//                             className="p-2 hover:bg-red-50 text-red-400 rounded-xl transition-all"
//                           >
//                             <Trash2 size={20} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyInventory;


import React from 'react';

import { Pill, Search, Info, ShieldCheck, ChevronLeft, Zap } from 'lucide-react';
import { useMedicines } from '../hooks/useMedicines';

const Pharmacy = () => {
  // جلب الأدوية اللي أنت ضفتها من الداشبورد
  const { medicinesQuery } = useMedicines();
  const { data: medicines, isLoading } = medicinesQuery;

  if (isLoading) return <div className="p-20 text-center font-bold text-primary animate-pulse">جاري تحميل قائمة الأدوية...</div>;

 
 return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans" dir="rtl">
      
      {/* --- Hero Section: تصميم فخم للعنوان --- */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-16 pb-24 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white shadow-sm border border-slate-100 rounded-full text-primary text-xs font-black mb-4 tracking-widest uppercase">
            نظام الصيدلية المتكامل
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            الأدوية والمنتجات <span className="text-primary italic">الطبية</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            استعرض كافة الأدوية المتوفرة في مستودعاتنا المركزية. دقة، أمان، وتوافر على مدار الساعة.
          </p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        
        {/* Search Bar: Floating Design */}
        <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white flex flex-col md:flex-row gap-4 items-center mb-16">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="ابحث عن الدواء بالاسم التجاري أو العلمي..."
              className="w-full bg-slate-50/50 border-none rounded-2xl py-4 pr-6 pl-14 outline-none focus:ring-2 ring-primary/20 transition-all font-bold text-slate-700"
            />
          </div>
          <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-primary transition-all shadow-lg shadow-slate-900/10">
            بحث متقدم
          </button>
        </div>

        {/* --- الأدوية: Grid Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {medicines?.map((med: any) => (
            <div key={med._id} className="group relative bg-white rounded-[3rem] p-2 border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
              
              {/* Card Inner Content */}
              <div className="bg-[#fcfdfe] rounded-[2.5rem] p-8 h-full flex flex-col">
                
                {/* Top Row: Category & Icon */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Pill size={28} />
                  </div>
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter">
                    {med.category}
                  </span>
                </div>

                {/* Medicine Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-primary transition-colors italic">
                    {med.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 mb-6">
                    <Zap size={14} />
                    <span className="text-xs font-bold uppercase">{med.genericName || 'Formula Active'}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="inline-flex items-end gap-1 bg-white px-5 py-2 rounded-2xl border border-slate-50 shadow-sm mb-6">
                    <span className="text-2xl font-black text-slate-900">{med.sellingPrice || 0}</span>
                    <span className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">EGP</span>
                  </div>
                </div>

                {/* Footer Action */}
                <button className="w-full flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  <span className="font-black text-sm">عرض المواصفات</span>
                  <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-white/10">
                    <ChevronLeft size={18} />
                  </div>
                </button>
              </div>

              {/* Decorative Badge for Availability */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ShieldCheck className="text-emerald-500" size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {medicines?.length === 0 && (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Pill size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-400 italic">المخزون فارغ حالياً..</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;