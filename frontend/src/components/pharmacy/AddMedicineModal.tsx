import { useForm } from 'react-hook-form';
import { X, Pill, DollarSign, Package, Calendar, MapPin, Barcode, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useMedicines } from '../../hooks/useMedicines';

const AddMedicineModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { addMutation } = useMedicines();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const imageUrl = watch('image');

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      purchasePrice: Number(data.purchasePrice),
      stock: Number(data.stock),
      minThreshold: Number(data.minThreshold || 10),
    };
    
    addMutation.mutate(formattedData, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-primary/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white">
              <Pill size={24} />
            </div>
            <h2 className="text-xl font-black text-primary">إضافة صنف جديد للمستودع</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* القسم الأول: المعلومات الأساسية */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 mr-2 uppercase">اسم الدواء (تجاري)</label>
                <input {...register('name', { required: 'الاسم مطلوب' })} className="form-input-custom" placeholder="Panadol Extra" />
                {errors.name && <span className="text-red-500 text-[10px] mr-2">{errors.name.message as string}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 mr-2 uppercase">الاسم العلمي (Generic)</label>
                <input {...register('genericName')} className="form-input-custom" placeholder="Paracetamol / Caffeine" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 mr-2 uppercase">التصنيف</label>
                <select {...register('category', { required: true })} className="form-input-custom appearance-none cursor-pointer">
                  <option value="Painkillers">مسكنات</option>
                  <option value="Antibiotics">مضادات حيوية</option>
                  <option value="Vitamins">فيتامينات</option>
                  <option value="Chronic">أدوية مزمنة</option>
                  <option value="Others">أخرى</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 mr-2 uppercase">الباركود</label>
                <div className="relative">
                   <Barcode size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input {...register('barcode')} className="form-input-custom pl-10" placeholder="00000000" />
                </div>
              </div>
            </div>

            {/* القسم الثاني: الصورة (Preview) */}
            <div className="bg-gray-50 rounded-3xl p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 gap-3">
              <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-200" size={48} />
                )}
              </div>
              <input {...register('image')} placeholder="رابط صورة الدواء" className="w-full text-[10px] p-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {/* القسم الثالث: التسعير والمخزون */}
            <hr className="md:col-span-3 border-gray-50" />
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase flex items-center gap-1">
                <DollarSign size={12} /> سعر الشراء
              </label>
              <input type="number" step="0.01" {...register('purchasePrice', { required: true })} className="form-input-custom border-orange-100" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase flex items-center gap-1">
                <DollarSign size={12} /> سعر البيع
              </label>
              <input type="number" step="0.01" {...register('price', { required: true })} className="form-input-custom border-green-100" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase flex items-center gap-1">
                <Package size={12} /> الكمية المتاحة
              </label>
              <input type="number" {...register('stock', { required: true })} className="form-input-custom" />
            </div>

            {/* القسم الرابع: التواريخ واللوكيشن */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase flex items-center gap-1">
                <Calendar size={12} /> تاريخ الصلاحية
              </label>
              <input type="date" {...register('expiryDate', { required: true })} className="form-input-custom font-sans" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase flex items-center gap-1">
                <MapPin size={12} /> الموقع (الرف)
              </label>
              <input {...register('location')} className="form-input-custom" placeholder="A-1" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 mr-2 uppercase">حد التنبيه (النواقص)</label>
              <input type="number" defaultValue={10} {...register('minThreshold')} className="form-input-custom bg-red-50/30" />
            </div>
          </div>

          <div className="flex gap-4 mt-10">
             <button 
               type="button" 
               onClick={onClose}
               className="flex-1 cursor-pointer py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all"
             >
               إلغاء
             </button>
             <button 
                type="submit"
                disabled={addMutation.isPending}
                className="flex-[2] cursor-pointer bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300"
              >
                {addMutation.isPending ? <Loader2 className="animate-spin" /> : "إضافة الصنف للمخزون"}
              </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-input-custom {
          background-color: #f9fafb;
          border: 1px solid #f3f4f6;
          padding: 0.85rem 1rem;
          border-radius: 1rem;
          outline: none;
          font-size: 0.875rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .form-input-custom:focus {
          background-color: white;
          border-color: #0d3b66; /* لون الـ primary بتاعك */
          box-shadow: 0 0 0 4px rgba(13, 59, 102, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AddMedicineModal;