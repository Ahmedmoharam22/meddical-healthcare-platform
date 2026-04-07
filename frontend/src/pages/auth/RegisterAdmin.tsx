import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  UserPlus, Mail, Lock, User as UserIcon, 
  KeyRound, Eye, EyeOff, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const RegisterAdmin = () => {
  // 1. Logic & Hooks
  const { registerAdmin, isRegisterLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm();

  // دالة الإرسال
  const onSubmit = (data: any) => {
    registerAdmin({
      name: data.name,
      email: data.email,
      password: data.password,
      secretKey: data.secretKey,
      role: 'admin' // إجباري أدمن عشان إحنا في لوحة التحكم
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* الجانب الأيمن: ترحيب وشعار */}
        <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center items-center text-center space-y-4">
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-sm">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-black">إدارة النظام</h2>
          <p className="text-primary-100 text-sm leading-relaxed">
            من هنا يمكنك إضافة مديرين جدد لمجمع النور الطبي بصلاحيات كاملة.
          </p>
        </div>

        {/* الجانب الأيسر: الفورم */}
        <div className="md:w-2/3 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800">إنشاء حساب أدمن</h3>
            <p className="text-slate-400 text-sm">برجاء ملء البيانات بدقة</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* الاسم */}
            <div className="space-y-1">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  {...register('name', { required: "الاسم مطلوب" })}
                  className={`w-full bg-slate-50 border-2 rounded-2xl py-3.5 pr-5 pl-12 outline-none transition-all ${errors.name ? 'border-red-400' : 'border-slate-100 focus:border-primary'}`}
                  placeholder="الاسم بالكامل"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mr-2">{errors.name.message as string}</span>}
            </div>

            {/* الإيميل */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email"
                  {...register('email', { required: "البريد الإلكتروني مطلوب" })}
                  className={`w-full bg-slate-50 border-2 rounded-2xl py-3.5 pr-5 pl-12 outline-none transition-all text-left ${errors.email ? 'border-red-400' : 'border-slate-100 focus:border-primary'}`}
                  placeholder="admin@nour-medical.com"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mr-2">{errors.email.message as string}</span>}
            </div>

            {/* الباسورد */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-12 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: "كلمة المرور مطلوبة", minLength: { value: 6, message: "6 أحرف على الأقل" } })}
                  className={`w-full bg-slate-50 border-2 rounded-2xl py-3.5 pr-5 pl-20 outline-none transition-all text-left ${errors.password ? 'border-red-400' : 'border-slate-100 focus:border-primary'}`}
                  placeholder="كلمة المرور"
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs mr-2">{errors.password.message as string}</span>}
            </div>

            {/* السيكريت كي (Secret Key) */}
            {/* <div className="space-y-1 pt-2 border-t border-slate-50">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">مفتاح الحماية السري</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                <input 
                  type="password"
                  {...register('secretKey', { required: "مفتاح التسجيل مطلوب" })}
                  className={`w-full bg-primary/5 border-2 rounded-2xl py-3.5 pr-5 pl-12 outline-none transition-all text-left font-mono ${errors.secretKey ? 'border-red-400' : 'border-primary/10 focus:border-primary'}`}
                  placeholder="Secret Key"
                />
              </div>
              {errors.secretKey && <span className="text-red-500 text-xs mr-2">{errors.secretKey.message as string}</span>}
            </div> */}

            {/* زر الإرسال */}
            <button 
              type="submit"
              disabled={isRegisterLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {isRegisterLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>تأكيد إنشاء الحساب</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;