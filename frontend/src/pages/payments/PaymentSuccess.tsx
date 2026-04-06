import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight, Printer } from 'lucide-react';
import SEO from '../../components/SEO';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id'); // لو حابب تعرض رقم العملية

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-cairo">
      <SEO title="تم الحجز بنجاح - مجمع النور الطبي" description="شكراً لثقتكم، تم تأكيد حجزكم بنجاح في مجمع النور الطبي." />
      
      <div className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-10 md:p-16 text-center border border-green-50 relative overflow-hidden">
        {/* خلفية جمالية خفيفة */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle size={56} strokeWidth={2.5} />
          </div>

          <h1 className="text-4xl font-black text-primary mb-4">تم تأكيد الحجز بنجاح!</h1>
          <p className="text-gray-500 font-bold text-lg mb-10 leading-relaxed">
            شكراً لثقتكم بمجمع النور الطبي. لقد تم استلام دفعتكم وتأكيد موعدكم. 
            سوف تصلكم رسالة نصية بكافة التفاصيل قريباً.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-site-bg p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Calendar size={24} />
               </div>
               <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold">حالة الحجز</p>
                  <p className="text-primary font-black">مؤكد ومقبول</p>
               </div>
            </div>
            <div className="bg-site-bg p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Printer size={24} />
               </div>
               <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold">رقم العملية</p>
                  <p className="text-primary font-black text-xs truncate w-32">
                    {sessionId?.slice(-10) || "N/A"}
                  </p>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="px-10 py-5 bg-primary text-white rounded-2xl font-black hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <ArrowRight size={20} />
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;