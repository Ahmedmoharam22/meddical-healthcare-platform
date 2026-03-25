import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Stethoscope, MessageSquare, 
  FileText, LogOut, Menu, Bell, User, 
  Calendar, BarChart3, Home, X, ExternalLink,
  Package
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../common/Logo';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة المنيو في الموبايل

  const menuItems = [
    { name: 'الإحصائيات', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'الأطباء', path: '/admin/doctors', icon: <Stethoscope size={20} /> },
    { name: 'التخصصات', path: '/admin/specialties', icon: <Users size={20} /> },
    { name: 'المواعيد', path: '/admin/appointments', icon: <Calendar size={20} /> },
    { name: 'الخدمات', path: '/admin/services', icon: <Stethoscope size={20} /> },
    { name: 'المقالات', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'رسائل المرضى', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'إحصائيات المركز', path: '/admin/stats', icon: <BarChart3 size={20} /> },
    { name: 'المخزن', path: '/admin/inventory', icon: <Package size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <div>
        <Logo showText={true} className="scale-110" textColor="text-accent"  />
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">لوحة التحكم الإدارية</p>
        </div>
        {/* زرار القفل يظهر فقط في الموبايل */}
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/50">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsSidebarOpen(false)} // يقفل المنيو لما تختار حاجة في الموبايل
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
        
        {/* زرار عرض الموقع - يفتح في تابة جديدة */}
        <a 
          href="/" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-accent hover:bg-accent/10 mt-4 border border-accent/20"
        >
          <ExternalLink size={20} />
          عرض الموقع العام
        </a>
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
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-cairo" dir="rtl">
      
      {/* 1. Sidebar Desktop (شغال زي ما هو) */}
      <aside className="w-72 bg-primary text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Sidebar (Drawer) */}
      {/* الـ Overlay السوداء */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[40] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* الـ Sidebar نفسه في الموبايل */}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-primary text-white z-[50] transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Navbar */}
        {/* Top Navbar - المطور باللون الرئيسي */}
<header className="h-20 bg-primary border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shadow-md">
  {/* زرار المنيو للموبايل */}
  <button 
    onClick={() => setIsSidebarOpen(true)}
    className="md:hidden text-accent p-2 hover:bg-white/10 rounded-xl transition-all"
  >
    <Menu size={28} />
  </button>
  
  {/* لوجو صغير يظهر في الموبايل فقط لأن الـ Sidebar بيكون مخفي */}
  <div className="md:hidden">
    <h2 className="text-xl font-black text-white">مجمع<span className="text-accent"> النور</span></h2>
  </div>

  <div className="flex items-center gap-4 md:gap-6">
    {/* التنبيهات مع تأثير عند الحوم (Hover) */}
    <button className="relative text-white/70 hover:text-accent transition-all p-2 hover:bg-white/5 rounded-full">
      <Bell size={22} />
      <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-primary rounded-full"></span>
    </button>

    <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

    {/* بروفايل السينيور */}
    <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-2xl border border-white/5">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-black text-white leading-none">سينيور مجمع النور</p>
        <p className="text-[10px] text-accent mt-1 font-bold italic tracking-wider">مدير النظام</p>
      </div>
      <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center font-bold shadow-lg shadow-accent/20">
        <User size={20} />
      </div>
    </div>
  </div>
</header>

        {/* Page Content */}
        <div className="p-4 md:p-8 flex-grow overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;