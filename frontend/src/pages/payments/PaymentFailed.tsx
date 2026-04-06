import { Link } from 'react-router-dom';
import { XCircle, RefreshCcw, PhoneCall, AlertCircle } from 'lucide-react';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-cairo">
      <div className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-10 md:p-16 text-center border border-red-50 relative overflow-hidden">
        
        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle size={56} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-black text-primary mb-4">عذراً، لم يكتمل الدفع</h1>
        <p className="text-gray-500 font-bold text-lg mb-10 leading-relaxed">
          يبدو أن هناك مشكلة حدثت أثناء عملية الدفع الإلكتروني. لا تقلق، لم يتم خصم أي مبالغ من حسابك. يمكنك المحاولة مرة أخرى أو اختيار الدفع عند الوصول.
        </p>

        <div className="bg-red-50 p-6 rounded-3xl mb-10 flex items-start gap-4 text-right border border-red-100">
           <AlertCircle className="text-red-500 shrink-0" size={24} />
           <div>
              <p className="text-red-800 font-black mb-1">أسباب محتملة للفشل:</p>
              <ul className="text-red-700/70 text-sm font-bold list-disc list-inside space-y-1">
                 <li>رصيد غير كافٍ في البطاقة.</li>
                 <li>رفض البنك للعملية الدولية.</li>
                 <li>انتهاء وقت الجلسة (Timeout).</li>
              </ul>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/doctors" 
            className="px-8 py-5 bg-primary text-white rounded-2xl font-black hover:bg-secondary transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw size={20} />
            إعادة المحاولة
          </Link>
          <a 
            href="tel:01XXXXXXXXX" 
            className="px-8 py-5 bg-white text-primary border-2 border-gray-100 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall size={20} />
            اتصل بنا للمساعدة
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;