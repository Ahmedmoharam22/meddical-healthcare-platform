import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { contactSchema, type ContactInput } from '../../utils/validations';
import { useSendMessage } from '../../hooks/useMessages';
import SectionHeader from '../common/SectionHeader';

const Contact = () => {
  const { mutate, isPending } = useSendMessage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactInput) => mutate(data, { onSuccess: () => reset() });

  return (<>
    <section id="contact" className="py-24 bg-white font-cairo">
      <div className="container mx-auto px-4">
       <SectionHeader subtitle="تواصل معنا للشكاوي والاقتراحات" className='mb-0 text-right' center={false} title="راحتك تهمنا" />
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* جانب المعلومات - الـ Dark Mode Style */}
          <div className="lg:w-1/3 bg-primary p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">اتصل بنا</h2>
              <p className="text-accent/80 mb-12">نحن هنا للإجابة على جميع استفساراتك وتقديم الدعم الطبي اللازم.</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors cursor-pointer">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-accent">اتصل بنا</p>
                    <p className="font-bold">0123-456-789</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors cursor-pointer">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-accent">البريد الإلكتروني</p>
                    <p className="font-bold">info@alnoor-center.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors cursor-pointer">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-accent">الموقع</p>
                    <p className="font-bold">المنصورة، المشاية السفلية</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-accent mb-4">تابعنا على</p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-secondary transition-all"><MessageCircle size={18}/></div>
              </div>
            </div>
          </div>

          {/* جانب الفورم - الـ Clean Style */}
          <div className="lg:w-2/3 p-12 lg:p-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* حقل الاسم */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-primary mr-2">الاسم</label>
    <input {...register('name')} className={`p-4 rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-100'} outline-none focus:ring-2 focus:ring-secondary`} placeholder="اسمك بالكامل" />
    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
  </div>

  {/* حقل الهاتف - (ده اللي كان ناقص) */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-primary mr-2">رقم الهاتف</label>
    <input {...register('phone')} className={`p-4 rounded-2xl bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-100'} outline-none focus:ring-2 focus:ring-secondary`} placeholder="01xxxxxxxxx" />
    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
  </div>
</div>

<div className="flex flex-col gap-2">
  <label className="text-sm font-bold text-primary mr-2">البريد الإلكتروني</label>
  <input {...register('email')} className={`p-4 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} outline-none focus:ring-2 focus:ring-secondary`} placeholder="example@mail.com" />
  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
</div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-primary mr-2">الموضوع</label>
                <input {...register('subject')} className={`p-4 rounded-2xl bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-100'} outline-none focus:ring-2 focus:ring-secondary`} placeholder="كيف يمكننا مساعدتك؟" />
                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-primary mr-2">الرسالة</label>
                <textarea {...register('message')} rows={5} className={`p-4 rounded-2xl bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-100'} outline-none focus:ring-2 focus:ring-secondary resize-none`} placeholder="اكتب رسالتك هنا..." />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              <button 
                disabled={isPending}
                className="w-full md:w-max px-12 py-4 bg-secondary text-white font-bold rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:bg-gray-400"
              >
                {isPending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;