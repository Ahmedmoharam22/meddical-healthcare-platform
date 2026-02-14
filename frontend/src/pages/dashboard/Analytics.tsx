import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { transformSpecialtyData, transformStatusData } from '../../utils/chartTransformers';
import axiosInstance from '../../api/axiosInstance';

const Analytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => axiosInstance.get('/stats/dashboard').then(res => res.data)
  });

  if (isLoading) return <div className="p-20 text-center font-black">جاري تحليل البيانات...</div>;

  const specialtyData = transformSpecialtyData(data.appointmentsBySpecialty);
  const statusData = transformStatusData(data.statusStats);

  return (
    <div className="p-6 space-y-8" dir="rtl">
      <h1 className="text-3xl font-black text-primary">لوحة التحليلات الذكية</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. تخصصات الأكثر طلباً */}
        <div className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50">
          <h2 className="text-xl font-black mb-6 text-gray-700">الطلب حسب التخصص</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontFamily: 'Cairo', fontWeight: 'bold'}} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. توزيع حالات الحجز */}
        <div className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50 text-center">
          <h2 className="text-xl font-black mb-6 text-gray-700">كفاءة الحجوزات</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((s: any) => (
              <div key={s.name} className="flex items-center gap-2 text-xs font-bold">
                <span className="w-3 h-3 rounded-full" style={{backgroundColor: s.color}}></span> {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* 3. معدل الزيارات الأسبوعي */}
        <div className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50 lg:col-span-2">
          <h2 className="text-xl font-black mb-6 text-gray-700">معدل الحجوزات اليومي (آخر 7 أيام)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.last7Days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;