import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Stethoscope, MessageSquare, 
  FileText, LogOut, Menu, Bell, User, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'الإحصائيات', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'الأطباء', path: '/admin/doctors', icon: <Stethoscope size={20} /> },
    { name: 'التخصصات', path: '/admin/specialties', icon: <Users size={20} /> },
    { name: 'المواعيد', path: '/admin/appointments', icon: <Calendar size={20} /> },
    { name: 'الخدمات', path: '/admin/services', icon: <Stethoscope size={20} /> },
    { name: 'المقالات', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'رسائل المرضى', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'إحصائيات المركز', path: '/admin/stats', icon: <BarChart3 size={20} /> },

  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-black text-accent">مجمع النور</h2>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">لوحة التحكم الإدارية</p>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold ${
                location.pathname === item.path 
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                : 'hover:bg-white/5 text-white/70'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-4 py-4 w-full text-red-400 font-bold hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <button className="md:hidden text-primary"><Menu /></button>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-primary transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-left md:text-right">
                <p className="text-sm font-black text-primary leading-none">سينيور مجمع النور</p>
                <p className="text-[10px] text-gray-400 mt-1 font-bold italic">مدير النظام</p>
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-primary border border-accent/20">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-grow">
          <Outlet /> {/* هنا هتظهر كل صفحة داخلية */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;