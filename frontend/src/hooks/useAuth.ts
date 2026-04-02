import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();

  // 1. هوك تسجيل الدخول (Login)
  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      // ملحوظة: اتأكد من المسار /users/login أو /auth/login حسب الباك إند عندك
      const { data } = await axiosInstance.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data));
      
      // تحديث الهيدرز فوراً
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      toast.success(`أهلاً بك يا ${data.name} 👋`);
      navigate('/admin/dashboard');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'البريد أو كلمة المرور غير صحيحة');
    }
  });

  // 2. هوك إنشاء حساب جديد (Register) - التعديل الجديد هنا 🔥
  const registerMutation = useMutation({
    mutationFn: async (adminData: any) => {
      // بيبعت الاسم، الإيميل، الباسورد، الـ role، والـ secretKey
      const { data } = await axiosInstance.post('/auth/register', adminData);
      return data;
    },
    onSuccess: () => {
      toast.success('تم إنشاء حساب المسؤول بنجاح! يمكنه تسجيل الدخول الآن.');
      // لو عايز توجهه لحتة تانية بعد الـ register فك الكومنت اللي تحت
      // navigate('/admin/managers-list'); 
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'فشل التسجيل، تأكد من المفتاح السري');
    }
  });

  // 3. دالة تسجيل الخروج (Logout)
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/login', { replace: true });
  };

  return {
    // تسجيل الدخول
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    
    // إنشاء حساب (التعديل الجديد)
    registerAdmin: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    
    // تسجيل الخروج
    logout
  };
};