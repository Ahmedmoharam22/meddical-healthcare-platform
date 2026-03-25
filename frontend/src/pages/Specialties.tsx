import * as Icons from 'lucide-react';
import { useSpecialties } from '../hooks/useSpecialties';
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Specialties = () => {
  const { data: specialties, isLoading } = useSpecialties();

  if (isLoading) return <Loading />;

  return (
    <div className="font-cairo bg-site-bg">
      <SEO
        title="تخصصات مجمع النور الطبي - قصة صرح خيري في المحمودية"
        description="تعرف على قصة مجمع النور الطبي، من فكرة بسيطة إلى واقع يخدم أهالي المحمودية وميت فارس وعرب شراويد. مبادرة خيرية بخبرات طبية متكاملة."
        keywords="مجمع النور الطبي، المحمودية، ميت فارس، عرب شراويد، خدمات طبية، تخصصات طبية، مبادرة خيرية، صحة، طب"
      />
      {/* Hero Section - واجهة تليق بصرح المحمودية الطبي */}
      <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-display-3 md:text-display-2 text-white font-black mb-6">
            تخصصات مجمع النور <br/> 
            <span className="text-secondary text-3xl md:text-5xl italic">نخبة من الأطباء في خدمتك</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
            نوفر كافة التخصصات الطبية لخدمة أهالينا من ميت فارس وحتى عرب شراويد، مجهزين بأحدث التقنيات لضمان أدق التشخيصات.
          </p>
        </div>
        {/* عنصر ديكوري خلفي */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* قائمة التخصصات الكاملة */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {specialties?.map((spec) => {
            // اختيار الأيقونة من مكتبة Lucide بناءً على الداتا أو أيقونة افتراضية
            const IconComponent = (Icons as any)[spec.icon] || Icons.Stethoscope;

            return (
              <div 
                key={spec._id} 
                className="group bg-white rounded-[45px] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 relative flex flex-col h-full overflow-hidden"
              >
                {/* أيقونة التخصص */}
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:rotate-6 transition-all duration-500">
                  <IconComponent className="text-primary group-hover:text-white transition-colors" size={40} />
                </div>

                {/* المحتوى */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {spec.description}
                  </p>
                </div>

                {/* التوجه لصفحة التخصص بناءً على الـ Slug */}
                
               <Link to={`/specialties/${spec.slug}`}
                  className="inline-flex items-center gap-3 text-primary font-black group/link cursor-pointer mt-auto"
                >
                  <span className="border-b-2 border-transparent group-hover/link:border-secondary transition-all">
                    عرض الأطباء والمواعيد
                  </span>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover/link:bg-secondary transition-colors">
                    <Icons.ArrowRight size={18} />
                  </div>
                </Link>

                {/* Decoration: أيقونة باهتة في الخلفية تظهر عند الهوفر */}
                <div className="absolute top-10 left-10 text-gray-100 -z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <IconComponent size={80} strokeWidth={1} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Banner الطوارئ والدعم */}
      <section className="pb-24 container mx-auto px-4">
        <div className="bg-white rounded-[50px] p-12 border-4 border-dashed border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-accent/20 p-5 rounded-full text-primary shadow-inner">
              <Icons.PhoneCall size={48} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-primary">هل تحتاج استشارة عاجلة؟</h4>
              <p className="text-gray-500">فريق الاستقبال متواجد للرد على استفساراتكم وتوجيهكم للقسم المختص.</p>
            </div>
          </div>
          <a 
            href="tel:0123456789" 
            className="bg-primary text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-secondary transition-all cursor-pointer shadow-lg"
          >
            اتصل بنا الآن
          </a>
        </div>
      </section>
    </div>
  );
};

export default Specialties;