// src/components/AdminQuickBar.tsx
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminQuickBar = () => {
  const { user } = useAuth();

  // لو مش أدمن م تظهرش حاجة
  // if (user?.role !== 'admin') return null;
  if (user?.role !== 'admin') return null;

  return (
    <div className="bg-primary text-white py-2 px-4 flex justify-between items-center text-xs font-bold fixed top-0 z-[100] border-b border-accent/20 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        وضع الإدارة نشط
      </div>
      
      <Link 
        to="/admin/dashboard" 
        className="flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full hover:bg-white transition-all shadow-lg"
      >
        <LayoutDashboard size={14} />
        العودة للوحة التحكم
      </Link>
    </div>
  );
};

export default AdminQuickBar;