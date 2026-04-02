import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { loginSchema } from '../../utils/authSchema';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, isLoading } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: any) => {
    login(data); // إرسال الإيميل والباسورد للباك إند
  };

  return (
    <div className="min-h-screen font-cairo bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* ديكور خلفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 relative z-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-secondary" size={40} />
          </div>
          <h1 className="text-3xl font-black text-primary">لوحة التحكم</h1>
          <p className="text-gray-400 font-bold mt-2">مجمع النور الطبي - الإدارة</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-primary mr-2">البريد الإلكتروني</label>
            <div className="relative">
              <input 
                {...register('email')}
                className="w-full p-4 pr-12 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold"
                placeholder="admin@alnoor.com"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.email && <p className="text-red-500 text-xs font-bold mr-2">{errors.email.message as string}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-primary mr-2">كلمة المرور</label>
            <div className="relative">
              <input 
                {...register('password')}
                type="password"
                className="w-full p-4 pr-12 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold"
                placeholder="••••••••"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.password && <p className="text-red-500 text-xs font-bold mr-2">{errors.password.message as string}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-primary hover:shadow-xl hover:shadow-secondary/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            دخول للنظام <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;