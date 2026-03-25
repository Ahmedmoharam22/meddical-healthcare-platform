import SectionHeader from '../components/common/SectionHeader';
import AppointmentForm from '../components/forms/AppointmentForm';
import { Phone, Clock, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const BookAppointment = () => {
  return (
    <div className="min-h-screen bg-gray-50  font-cairo py-12 lg:py-24">
      <SEO 
        title="حجز موعد" 
        description="احجز موعدك الطبي الآن في مجمع النور الطبي بكل سهولة وسرعة."
      />

      <div className="container mx-auto px-4">
        <SectionHeader 
          title="حجز موعد طبي"
          subtitle="خطوة واحدة تفصلك عن الرعاية الصحية المتميزة، املأ النموذج وسنقوم بالرد فوراً."
        />

        <div className="flex flex-col lg:flex-row bg-primary rounded-[40px] overflow-hidden shadow-2xl mt-12">
          {/* الجانب الأيمن: محتوى ثابت */}
          <div className="lg:w-2/5 p-12 lg:p-16 text-white bg-primary flex flex-col justify-center relative">
            {/* زخرفة خلفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
            
            <h2 className="text-3xl font-black mb-8 leading-tight">لماذا تختار مجمع النور؟</h2>
            
            <ul className="space-y-6 mb-12">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shrink-0"><ShieldCheck size={20} /></div>
                <p className="text-sm font-bold opacity-90">خصوصية تامة لبيانات المرضى</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary shrink-0"><Clock size={20} /></div>
                <p className="text-sm font-bold opacity-90">التزام تام بالمواعيد المحددة</p>
              </li>
            </ul>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-accent text-xs font-black uppercase tracking-widest mb-2">للمساعدة الفورية</p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-secondary text-primary rounded-2xl flex items-center justify-center font-bold">
                    <Phone size={24} />
                 </div>
                 <div>
                    <p className="text-lg font-black tracking-wider">045-3612-255</p>
                    <p className="text-[10px] opacity-60">اتصل بنا متاحين 24/7</p>
                 </div>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: الفورم المعزولة */}
          <div className="lg:w-3/5 bg-white dark:bg-slate-900 p-12 lg:p-16 transition-colors duration-300">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;