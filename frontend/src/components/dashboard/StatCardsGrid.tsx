import { Stethoscope, Users, MessageSquare, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

interface Props {
  totalDoctors: number;
  totalSpecialties: number;
  totalMessages: number;
  totalBlogs: number;
}

const STAT_CONFIG = (stats: Props) => [
  { label: 'إجمالي الأطباء',  value: stats.totalDoctors,    icon: <Stethoscope size={28} />, color: 'bg-blue-500' },
  { label: 'الأقسام الطبية',  value: stats.totalSpecialties, icon: <Users size={28} />,       color: 'bg-purple-500' },
  { label: 'الرسائل الجديدة', value: stats.totalMessages,   icon: <MessageSquare size={28} />, color: 'bg-orange-500' },
  { label: 'المقالات',        value: stats.totalBlogs,      icon: <TrendingUp size={28} />,  color: 'bg-green-500' },
];

const StatCardsGrid = (props: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {STAT_CONFIG(props).map((stat, i) => (
      <StatCard key={i} {...stat} />
    ))}
  </div>
);

export default StatCardsGrid;