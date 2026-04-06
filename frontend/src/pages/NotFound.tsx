import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-cairo" dir="rtl">
      <SEO
        title="404 - الصفحة غير موجودة"
        description="الصفحة المطلوبة غير موجودة في مجمع النور الطبي"
        keywords="404, صفحة غير موجودة, مجمع النور الطبي"
      />
      <div className="max-w-md w-full text-center">
        {/* أنيميشن للأيقونة */}
        <div 
                  className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>
            <AlertTriangle size={120} className="text-accent relative z-10" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً، الصفحة غير موجودة!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          يبدو أن الرابط الذي تحاول الوصول إليه غير متاح حالياً أو تم نقله. 
          لا تقلق، يمكنك العودة دائماً للرئيسية ومتابعة رحلتك معنا.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-secondary transition-all group"
          >
            <Home size={20} />
            العودة للرئيسية
          </Link>
          
          <Link 
            to="/contact" 
            className="flex items-center justify-center gap-2 text-primary font-bold hover:text-accent transition-colors py-2"
          >
            تبليغ عن مشكلة
            <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* لوجو المجمع تحت كـ Signature */}
        <div className="mt-12 opacity-30 grayscale">
           <h3 className="text-lg font-black text-primary">مجمع النور الطبي</h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;