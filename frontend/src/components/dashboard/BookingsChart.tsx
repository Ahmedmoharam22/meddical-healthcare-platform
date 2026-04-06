import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props { data: { _id: string; total: number }[] }

const BookingsChart = ({ data }: Props) => (
  <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 flex flex-col h-[450px]">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-xl font-black text-primary">إحصائيات الحجوزات</h3>
        <p className="text-gray-400 text-xs font-bold mt-1">نشاط الأيام السبعة الماضية</p>
      </div>
      <span className="bg-secondary/10 text-secondary text-xs px-4 py-1.5 rounded-full font-black">مباشر الآن</span>
    </div>
    <div className="flex-1 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#1e293b" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="_id"
            axisLine={false}
            tickLine={false}
            className="text-[10px] font-bold text-gray-400"
            tick={{ dy: 10 }}
            tickFormatter={val =>
              new Date(val).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
            }
          />
          <Tooltip
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontFamily: 'Cairo' }}
            labelFormatter={val => `تاريخ: ${val}`}
          />
          <Area type="monotone" dataKey="total" stroke="#1e293b" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BookingsChart;