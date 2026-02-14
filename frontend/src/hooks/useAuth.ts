import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();

  // 1. هوك تسجيل الدخول (Mutation)
  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await axiosInstance.post('/users/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      // تخزين التوكن وبيانات المستخدم
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data));
      
      // تحديث الهيدرز في أكسيوس فوراً للطلبات الجاية
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      toast.success(`أهلاً بك يا ${data.name}`);
      navigate('/admin/dashboard');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'البيانات غير صحيحة');
    }
  });

  // 2. دالة تسجيل الخروج (Local Function)
  const logout = () => {
    // مسح البيانات من المتصفح
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');

    // مسح التوكن من هيدرز Axios
    delete axiosInstance.defaults.headers.common['Authorization'];

    toast.success('تم تسجيل الخروج، نراك لاحقاً!');
    
    // التوجيه لصفحة اللوجين مع مسح التاريخ
    navigate('/login', { replace: true });
  };

  return {
    login: loginMutation.mutate, // تأكد إن الاسم هنا login
    isLoading: loginMutation.isPending,
    logout
};
};