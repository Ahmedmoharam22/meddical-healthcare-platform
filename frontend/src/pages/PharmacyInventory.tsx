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


import React, { useState } from 'react';
import { Pill, Search, ShieldCheck, Zap } from 'lucide-react';
import { useMedicines } from '../hooks/useMedicines';

const Pharmacy = () => {
  const { medicinesQuery } = useMedicines();
  const { data: medicines, isLoading } = medicinesQuery;
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div className="p-20 text-center font-bold text-primary animate-pulse font-cairo">جاري تحميل قائمة الأدوية...</div>;

  const filteredMedicines = medicines?.filter((med: any) => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (med.genericName && med.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-cairo" dir="rtl">
      
      {/* Hero Section */}
      <div className="bg-primary pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-white/5"></div>
         {/* Decorative circles */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
         
         <div className="container mx-auto relative z-10">
            <h5 className="text-secondary font-bold tracking-widest mb-4 uppercase">نظام الصيدلية المتكامل</h5>
            <h1 className="text-display-1 font-black mb-6">الأدوية والمنتجات الطبية</h1>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              استعرض كافة الأدوية المتوفرة في مستودعاتنا المركزية. دقة، أمان، وتوافر على مدار الساعة.
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
         {/* Search Bar */}
         <div className="bg-white p-4 rounded-2xl shadow-lg border border-primary/10 flex flex-col md:flex-row gap-4 items-center mb-16 max-w-4xl mx-auto">
           <div className="relative flex-1 w-full flex items-center">
             <Search className="absolute right-5 text-primary/40" size={22} />
             <input 
               type="text" 
               placeholder="ابحث عن الدواء بالاسم التجاري أو العلمي..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-50 border-none rounded-xl py-4 pr-14 pl-6 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-primary font-bold text-lg"
             />
           </div>
         </div>

         {/* Products Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMedicines?.map((med: any) => (
              <div key={med._id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border border-primary/5 flex flex-col h-full">
                 <div className="p-6 relative flex flex-col flex-grow">
                    {/* Category Label */}
                    <span className="absolute top-6 left-6 bg-accent/30 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-wider">
                       {med.category}
                    </span>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/5 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <Pill size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors" title={med.name}>
                       {med.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-primary/60 mb-6">
                       <Zap size={14} />
                       <span className="text-xs font-bold uppercase truncate">{med.genericName || 'Formula Active'}</span>
                    </div>

                    {/* Footer / Price & Status */}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/5">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-primary/50 font-bold mb-1 uppercase tracking-widest">السعر</span>
                          <div className="flex items-baseline gap-1">
                             <span className="text-2xl font-black text-secondary">{med.sellingPrice || 0}</span>
                             <span className="text-xs text-primary/60 font-bold">ج.م</span>
                          </div>
                       </div>
                       
                       {med.stock > 0 ? (
                         <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                           <ShieldCheck size={16} /> متوفر
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 text-red-500 text-xs font-black bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                           غير متوفر
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Empty State */}
         {filteredMedicines?.length === 0 && (
           <div className="text-center py-24 bg-white rounded-[32px] border border-primary/5 shadow-sm max-w-3xl mx-auto">
             <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/30">
                <Pill size={48} />
             </div>
             <h3 className="text-2xl font-black text-primary mb-2">لم يتم العثور على أدوية</h3>
             <p className="text-primary/60 font-medium">حاول البحث بكلمات مختلفة أو راجع الاسم الصحيح للدواء.</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default Pharmacy;