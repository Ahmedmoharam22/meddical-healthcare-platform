import { Users, Stethoscope, MessageSquare, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { label: 'إجمالي الأطباء', value: '24', icon: <Stethoscope size={28} />, color: 'bg-blue-500' },
    { label: 'التخصصات', value: '12', icon: <Users size={28} />, color: 'bg-purple-500' },
    { label: 'الرسائل الجديدة', value: '15', icon: <MessageSquare size={28} />, color: 'bg-orange-500' },
    { label: 'المقالات المنشورة', value: '48', icon: <TrendingUp size={28} />, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-primary">نظرة عامة</h1>
        <p className="text-gray-400 mt-1 font-bold">متابعة فورية لنشاط مجمع النور الطبي</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl transition-all duration-300">
            <div className={`${stat.color} text-white p-4 rounded-2xl shadow-lg shadow-gray-200`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* إضافات مستقبلية: Charts أو أحدث الرسائل */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 h-80 flex items-center justify-center">
            <p className="text-gray-300 font-bold italic">مساحة مخصصة للرسم البياني للمواعيد</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 h-80 flex items-center justify-center">
            <p className="text-gray-300 font-bold italic">مساحة مخصصة لأحدث الرسائل الواردة</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;