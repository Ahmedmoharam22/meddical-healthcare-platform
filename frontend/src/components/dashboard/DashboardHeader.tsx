import { Calendar } from 'lucide-react';

const DashboardHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <h1 className="text-4xl font-black text-primary">لوحة التحكم</h1>
      <p className="text-gray-400 mt-1 font-bold">ملخص شامل لأداء "مجمع النور الطبي"</p>
    </div>
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
      <Calendar className="text-secondary" size={20} />
      <span className="font-bold text-primary">
        {new Date().toLocaleDateString('ar-EG', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })}
      </span>
    </div>
  </div>
);

export default DashboardHeader;