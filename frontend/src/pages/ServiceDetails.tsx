import { useParams, Link } from 'react-router-dom';
import { useSingleService } from '../hooks/useSingleService';
import { useServices } from '../hooks/useServices';
import { CheckCircle, PhoneCall, FileText, ArrowLeft, HeartPulse, Clock, ShieldCheck, UserCheck } from 'lucide-react';
import Loading from '../components/common/Loading';

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error } = useSingleService(slug);
  const { data: allServices } = useServices();

  if (isLoading) return <Loading />;
  if (error || !service) return (
    <div className="py-40 text-center font-cairo">
      <h2 className="text-3xl font-black text-gray-800 mb-4">عذراً، الخدمة غير موجودة!</h2>
      <Link to="/services" className="text-primary hover:underline flex items-center justify-center gap-2">
        <ArrowLeft size={20} /> العودة لقائمة الخدمات
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-50 font-cairo" dir="rtl">
      {/* 1. Hero Header Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* الخلفية مع Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80"} 
            className="w-full h-full object-cover" 
            alt={service.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 to-primary/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-right">
          <Link to="/services" className="text-secondary mb-6 flex items-center gap-2 font-bold hover:gap-4 transition-all w-fit">
            <ArrowLeft className="rotate-180" size={20} />
            العودة للخدمات
          </Link>
          <h1 className="text-4xl md:text-6xl text-white font-black mb-4 leading-tight">
            {service.name}
          </h1>
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1"><HeartPulse size={18} className="text-secondary" /> رعاية متميزة</span>
            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
            <span>مجمع النور الطبي</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: المحتوى الأساسي */}
          <div className="lg:w-2/3">
            <div className="bg-white p-2 rounded-[35px] shadow-sm mb-10">
              <img 
                src={service.image || "https://images.unsplash.com/photo-1576091160550-2173dbc999ef?q=80"} 
                alt={service.name} 
                className="w-full h-[450px] object-cover rounded-[30px]"
              />
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-black text-primary mb-6">نهتم بصحتك من خلال قسم {service.name}</h2>
              <p className="text-xl text-gray-600 leading-[1.8] mb-8 italic border-r-4 border-secondary pr-6">
                {service.description}
              </p>
              
              <div className="prose prose-lg max-w-none text-gray-500 leading-loose mb-12">
                يوفر مجمع النور الطبي أحدث التقنيات العالمية في مجال {service.name}، تحت إشراف نخبة من كبار الاستشاريين والأخصائيين المصريين، لضمان حصولك على أفضل بروتوكول علاجي يتناسب مع حالتك الصحية في بيئة آمنة ومعقمة بالكامل.
              </div>

              {/* مميزات الخدمة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { text: 'أطباء استشاريون متخصصون', icon: <UserCheck className="text-secondary" /> },
                  { text: 'أحدث الأجهزة والتقنيات', icon: <ShieldCheck className="text-secondary" /> },
                  { text: 'خدمة متاحة على مدار الساعة', icon: <Clock className="text-secondary" /> },
                  { text: 'أسعار مناسبة وباقات خيرية', icon: <CheckCircle className="text-secondary" /> }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="bg-secondary/10 p-3 rounded-xl">{item.icon}</div>
                    <span className="font-bold text-primary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            
            {/* 1. قائمة الخدمات الأخرى */}
            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-secondary rounded-full"></span>
                كافة تخصصاتنا
              </h3>
              <ul className="flex flex-col gap-3">
                {allServices?.map((item) => (
                  <li key={item._id}>
                    <Link 
                      to={`/services/${item.slug}`}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold ${
                        item.slug === slug 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-gray-50 text-gray-600 hover:bg-secondary hover:text-white border border-gray-50'
                      }`}
                    >
                      {item.name}
                      <ArrowLeft size={16} className={`transition-transform group-hover:-translate-x-2 ${item.slug === slug ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. ويدجت التواصل - Call to Action */}
            <div className="bg-primary p-10 rounded-[40px] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                  <PhoneCall size={32} className="text-secondary animate-pulse" />
                </div>
                <h4 className="text-2xl font-black mb-3">هل لديك استفسار؟</h4>
                <p className="text-white/70 mb-8 leading-relaxed">تحدث مع فريقنا الطبي الآن للحصول على استشارة سريعة أو حجز موعد.</p>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-sm text-secondary font-bold mb-1 italic text-center">اتصل بنا مجاناً</p>
                  <p className="text-2xl font-black text-center tracking-wider text-white">045-3612-255</p>
                </div>
              </div>
              {/* زخارف الخلفية */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full"></div>
            </div>

            {/* 3. تحميل البروشور */}
            <button className="group flex items-center justify-between p-6 bg-white border-2 border-dashed border-gray-200 rounded-[30px] hover:border-secondary hover:bg-secondary/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <FileText size={24} />
                </div>
                <div className="text-right">
                   <span className="block font-black text-primary">دليل الخدمات</span>
                   <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">PDF - 2.4 MB</span>
                </div>
              </div>
              <span className="text-secondary font-black text-sm group-hover:underline">تحميل</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;