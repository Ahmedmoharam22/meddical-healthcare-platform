import React, { useState } from 'react';
import { Pill, Search, ShieldCheck, Zap } from 'lucide-react';
import { useMedicines } from '../hooks/useMedicines';
import Loading from '../components/common/Loading';
import PageHeader from '../components/common/PageHeader';
const Pharmacy = () => {
  const { medicinesQuery } = useMedicines();
  const { data: medicines, isLoading } = medicinesQuery;
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <Loading />

  const filteredMedicines = medicines?.filter((med: any) => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (med.genericName && med.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-cairo" dir="rtl">
      
      {/* Hero Section */}
      {/* <div className="bg-primary pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-white/5"></div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
         
         <div className="container mx-auto relative z-10">
            <h5 className="text-secondary font-bold tracking-widest mb-4 uppercase">نظام الصيدلية المتكامل</h5>
            <h1 className="text-display-1 font-black mb-6">الأدوية والمنتجات الطبية</h1>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              استعرض كافة الأدوية المتوفرة في مستودعاتنا المركزية. دقة، أمان، وتوافر على مدار الساعة.
            </p>
         </div>
      </div> */}
      <PageHeader 
        title="الصيدلية المتكاملة"
        subtitle="مجمع النور الطبي"
        description="نجمع بين كفاءة الأطباء وأحدث الأدوية والمنتجات الطبية في المحمودية."
      />

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