  import SectionHeader from '../common/SectionHeader';
  import { Phone } from 'lucide-react';
  import AppointmentForm from '../forms/AppointmentForm';

  const Appointment = () => {
    return (
      <section id="appointment" className="py-24 bg-white font-cairo">
        <SectionHeader
          title="احجز موعدك الآن"
          subtitle="املأ كافة البيانات المطلوبة لضمان تسجيل موعدك في مجمع النور الطبي بدقة."
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row bg-primary rounded-[40px] overflow-hidden shadow-2xl">
            
            {/* الجانب الأيمن: محتوى ثابت */}
            <div className="lg:w-2/5 p-12 lg:p-16 text-white bg-primary flex flex-col justify-center">
              <h2 className="text-display-2 font-bold mb-6">احجز موعدك الآن</h2>
              <p className="text-body-2 text-accent/80 mb-10 leading-relaxed">
                املأ كافة البيانات المطلوبة لضمان تسجيل موعدك في مجمع النور الطبي بدقة.
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-small text-accent font-bold">للطوارئ</p>
                  <p className="text-xl font-bold">0123-456-789</p>
                </div>
              </div>
            </div>

            {/* الجانب الأيسر: الفورم الكاملة */}
            <div className="lg:w-3/5 bg-[#F8FAFC] p-12 lg:p-16">
               <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Appointment;