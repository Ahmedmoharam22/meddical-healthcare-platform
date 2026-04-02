import { useState } from 'react';
import { 
  Plus, Search, Filter, Loader2, 
  AlertCircle, Package, Layers, RefreshCw 
} from 'lucide-react';
import { useMedicines } from '../../hooks/useMedicines';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import AddMedicineModal from '../../components/pharmacy/AddMedicineModal';
import ConfirmModal from '../../components/shared/ConfirmModal';

const Inventory = () => {
  // 1. States المنطقية
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  // 2. جلب البيانات باستخدام React Query Hook اللي عملناه
  const { medicinesQuery, deleteMutation } = useMedicines();
  const { data: medicines, isLoading, isError, refetch } = medicinesQuery;

  // 3. Logic الفلترة والبحث (Client-side Filtering)
  const filteredMedicines = medicines?.filter((med: any) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || med.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 4. إحصائيات سريعة (Top Stats)
  const lowStockCount = medicines?.filter((m: any) => m.stock <= (m.minThreshold || 10)).length;

  if (isLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="font-bold text-primary animate-pulse">جاري تحميل المخزن...</p>
    </div>
  );

  return (
    <div className="p-6 lg:p-10 bg-[#F8FAFC] min-h-screen font-cairo" dir="rtl">
      
      {/* --- الـ Header الإحترافي --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">إدارة المخزن المستودعي</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-1"><Package size={16}/> {medicines?.length || 0} صنف</span>
            <span className="flex items-center gap-1 text-orange-600 font-bold"><AlertCircle size={16}/> {lowStockCount} نواقص</span>
          </div>
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          <button 
            onClick={() => refetch()}
            className="p-4 bg-white text-primary rounded-2xl shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-grow lg:flex-grow-0 cursor-pointer bg-secondary text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-secondary/80 hover:text-white active:scale-95 transition-all"
          >
            <Plus size={22} />
            إضافة صنف جديد
          </button>
        </div>
      </div>

      {/* --- شريط الأدوات (Search & Filters) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
        <div className="lg:col-span-2 relative group">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={20} />
          <input 
            type="text"
            placeholder="ابحث باسم الدواء أو المادة الفعالة..."
            className="w-full bg-white border-none p-5 pr-14 rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-secondary/30 transition-all text-sm font-bold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <Layers className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            className="w-full bg-white border-none p-5 pr-14 rounded-[1.5rem] shadow-sm outline-none appearance-none font-bold text-gray-600 cursor-pointer"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">كل التصنيفات</option>
            <option value="Antibiotics">مضادات حيوية</option>
            <option value="Painkillers">مسكنات</option>
            <option value="Vitamins">فيتامينات</option>
            <option value="Chronic">أدوية مزمنة</option>
          </select>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-5 bg-white rounded-[1.5rem] text-gray-500 font-bold shadow-sm hover:bg-gray-50 transition-all border border-gray-50">
          <Filter size={18} />
          تصفية متقدمة
        </button>
      </div>

      {/* --- شبكة الأدوية (Medicines Grid) --- */}
      {filteredMedicines && filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredMedicines.map((med: any) => (
            <div key={med._id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
               <MedicineCard medicine={med} />
               
               {/* زرار حذف سريع "للسينيورز" فقط */}
               <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button 
                  onClick={() => {
                    setSelectedService(med);
                    setIsDeleteModalOpen(true);
                  }}
                className="bg-red-500/90 cursor-pointer backdrop-blur-md text-white p-2.5 rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] py-32 text-center shadow-sm border border-dashed border-gray-200">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Package size={40} />
          </div>
          <h3 className="text-xl font-black text-gray-400">لا توجد أدوية مطابقة للبحث حالياً</h3>
          <p className="text-gray-300 mt-2">جرب البحث بكلمات أخرى أو أضف صنفاً جديداً</p>
        </div>
      )}

      {/* --- المودال الخاص بالإلحاق --- */}
      <AddMedicineModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (selectedService) {
            deleteMutation.mutate(selectedService._id);
          }
        }}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف خدمة "${selectedService?.name}"؟`}
      />
      
    </div>
  );
};

export default Inventory;