interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string; // e.g. 'bg-blue-500'
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-white p-7 rounded-[35px] border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className="flex items-center gap-5 relative z-10">
      <div className={`${color} text-white p-4 rounded-2xl shadow-lg ring-4 ring-white`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-bold">{label}</p>
        <h3 className="text-3xl font-black text-primary">{value}</h3>
      </div>
    </div>
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />
  </div>
);

export default StatCard;