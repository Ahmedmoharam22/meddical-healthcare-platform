import { useDashboardStats } from '../../hooks/useDashboardStats';
import { useMessages } from '../../hooks/useMessages';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCardsGrid from '../../components/dashboard/StatCardsGrid';
import BookingsChart from '../../components/dashboard/BookingsChart';
import RecentMessagesFeed from '../../components/dashboard/RecentMessagesFeed';
import AdminLoader from '../../components/dashboard/AdminLoader';

const DashboardOverview = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentMessages, isLoading: messagesLoading } = useMessages();

  if (statsLoading || messagesLoading)
    return <AdminLoader label="جاري تجهيز بيانات الإدارة..." />;

  return (
    <div className="space-y-10 font-cairo" dir="rtl">
      <DashboardHeader />
      <StatCardsGrid
        totalDoctors={stats?.totalDoctors ?? 0}
        totalSpecialties={stats?.totalSpecialties ?? 0}
        totalMessages={stats?.totalMessages ?? 0}
        totalBlogs={stats?.totalBlogs ?? 0}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <BookingsChart data={stats?.last7Days ?? []} />
        <RecentMessagesFeed messages={recentMessages ?? []} />
      </div>
    </div>
  );
};

export default DashboardOverview;