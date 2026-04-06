import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Phone, MapPin, Clock, Send, MessageSquare, User, Smartphone, Mail, AlertCircle } from 'lucide-react';
import { useSendMessage } from '../hooks/useMessages';
import { contactSchema, type ContactInput } from '../utils/validations';
import SEO from '../components/SEO';

const ContactPage = () => {
  const { mutate, isPending } = useSendMessage();

  // إعداد الـ Form مع الـ Zod Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactInput) => {
    mutate(data, {
      onSuccess: () => {
        reset(); // تفريغ الفورم بعد الإرسال بنجاح
      }
    }); 
  };

  return (
    <div className="font-cairo bg-site-bg min-h-screen pb-20">
      {/* 1. Hero Section */}
     <SEO
        title="تواصل معنا - مجمع النور الطبي"
        description="تواصل مع مجمع النور الطبي، احجز موعدك، أو أرسل استفساراتك لفريقنا الطبي المتخصص."
        keywords="تواصل معنا، حجز موعد، استفسارات طبية، مجمع النور الطبي، دعم فني"
      />
      <section className="bg-primary pt-32 pb-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">تواصل معنا</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            نسعد دائماً باستقبال استفساراتكم. طاقمنا الطبي والإداري جاهز لخدمتكم على مدار الساعة.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 2. جانب المعلومات (Contact Info) */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">موقعنا</h3>
              <p className="text-gray-500 font-bold text-sm leading-relaxed">البحيرة، المحمودية، شارع الرشيدية</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">تليفون</h3>
              <p className="text-gray-500 font-bold text-sm" dir="ltr">+20 123 456 789</p>
            </div>
          </div>

          {/* 3. فورم التواصل المحدث (Zod Optimized) */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-xl border border-gray-50">
              <h2 className="text-3xl font-black text-primary mb-10 flex items-center gap-4">
                <MessageSquare size={32} className="text-secondary" /> راسلنا الآن
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* حقل الاسم */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-primary px-1">الاسم بالكامل</label>
                    <div className="relative">
                      <input 
                        {...register('name')}
                        placeholder="أدخل اسمك" 
                        className={`w-full p-4 pr-12 rounded-2xl bg-gray-50 border-2 outline-none transition-all font-bold ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary/30'}`}
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={14}/> {errors.name.message}</p>}
                  </div>

                  {/* حقل البريد الإلكتروني - (مهم حسب الـ Schema بتاعتك) */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-primary px-1">البريد الإلكتروني</label>
                    <div className="relative">
                      <input 
                        {...register('email')}
                        type="email"
                        placeholder="name@example.com" 
                        className={`w-full p-4 pr-12 rounded-2xl bg-gray-50 border-2 outline-none transition-all font-bold ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary/30'}`}
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={14}/> {errors.email.message}</p>}
                  </div>
                </div>

                {/* حقل الموضوع */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-primary px-1">الموضوع</label>
                  <input 
                    {...register('subject')}
                    placeholder="عنوان الرسالة" 
                    className={`w-full p-4 rounded-2xl bg-gray-50 border-2 outline-none transition-all font-bold ${errors.subject ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary/30'}`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={14}/> {errors.subject.message}</p>}
                </div>

                {/* حقل الرسالة */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-primary px-1">نص الرسالة</label>
                  <textarea 
                    {...register('message')}
                    rows={5} 
                    placeholder="كيف يمكننا مساعدتك؟" 
                    className={`w-full p-4 rounded-3xl bg-gray-50 border-2 outline-none transition-all font-bold resize-none ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary/30'}`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={14}/> {errors.message.message}</p>}
                </div>

                <button 
                  disabled={isPending}
                  type="submit" 
                  className={`w-full py-5 rounded-[24px] font-black flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer ${isPending ? 'bg-gray-400' : 'bg-secondary text-white hover:bg-primary shadow-secondary/20 hover:shadow-primary/30'}`}
                >
                  {isPending ? 'جاري الإرسال...' : (
                    <>إرسال الرسالة الآن <Send size={20} className="rotate-180" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;