import { Package, Calendar, AlertCircle } from 'lucide-react';
import type { MedicineProps } from '../../types';


const MedicineCard = ({ medicine }: MedicineProps) => {
  const isLowStock = medicine.stock < 10;
  
  return (
    <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* صورة الدواء */}
      <div className="relative h-48 w-full mb-5 overflow-hidden rounded-[2rem] bg-gray-50">
        <img 
          src={medicine.image} 
          alt={medicine.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm">
          {medicine.category}
        </div>
      </div>

      {/* تفاصيل الدواء */}
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-primary leading-tight">{medicine.name}</h3>
          <span className="text-secondary font-black text-lg">{medicine.price} ج.م</span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Package size={14} />
            <span className={isLowStock ? "text-red-500 font-bold" : ""}>
              الكمية: {medicine.stock} قطعة
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-[10px]">
            <Calendar size={14} />
            <span>تنتهي في: {new Date(medicine.expiryDate).toLocaleDateString('ar-EG')}</span>
          </div>
        </div>

        {/* زرار سريع للتعديل أو البيع */}
        <button className="w-full bg-gray-50 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
          عرض التفاصيل
        </button>
      </div>

      {/* تنبيه النواقص */}
      {isLowStock && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg animate-bounce">
          <AlertCircle size={16} />
        </div>
      )}
    </div>
  );
};

export default MedicineCard;