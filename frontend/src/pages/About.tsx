import { Heart, Users, Target, Calendar, MapPin, Award } from 'lucide-react';
import SEO from '../components/SEO';
import banner1 from '../assets/banner1.webp';
import PageHeader from '../components/common/PageHeader';
const About = () => {
  return (
    <div className="font-cairo">
      <SEO
        title="عن مجمع النور الطبي - قصة صرح خيري في المحمودية"
        description="تعرف على قصة مجمع النور الطبي، من فكرة بسيطة إلى واقع يخدم أهالي المحمودية وميت فارس وعرب شراويد. مبادرة خيرية بخبرات طبية متكاملة."
        keywords="مجمع النور الطبي، المحمودية، ميت فارس، عرب شراويد، مبادرة خيرية، طب، صحة، أطباء متطوعين"
      />
      {/* 1. Hero Section: عنوان الصفحة */}
     <PageHeader 
  title="خدمات مجمع النور"
  subtitle="رعاية صحية بقلب خيري"
  description="نجمع بين كفاءة الأطباء وأحدث التجهيزات لنقدم لكم خدمة طبية تليق بأهالينا في المحمودية."
/>

      {/* 2. القصة والأصل (Story Section) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src={banner1} alt="Building" loading="lazy" className="w-full  h-[500px] object-contain" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>             
            </div>

            <div className="lg:w-1/2">
              <h4 className="text-secondary font-bold mb-4 uppercase tracking-widest">كيف بدأنا؟</h4>
              <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">مجمع النور.. من فكرة بسيطة إلى واقع يخدم الآلاف</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  بفضل الله وتوفيقه، ثم بتبرعات أهل الخير، تم الانتهاء من تجهيز مجمع النور الطبي بالمحمودية. لم يكن مجرد مبنى، بل كان حلماً لكل أهالي "الخط الترابي".
                </p>
                <p className="bg-gray-50 p-6 rounded-2xl border-r-4 border-secondary">
                  <strong>نخدم أهالينا في:</strong> ميت فارس، عرب شراويد، وكافة القرى والنجوع المجاورة، لنوفر عليهم عناء السفر للمدن البعيدة بحثاً عن رعاية طبية تليق بهم.
                </p>
                <p>
                  المجمع مجهز بالكامل بأحدث الأجهزة الطبية، ويدار بنظام خيري متكامل يضمن وصول الخدمة لمستحقيها بأعلى جودة وأقل تكلفة، لأن الصحة حق للجميع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. الإحصائيات (Stats Section) */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'قرية مستفيدة', value: '15+', icon: MapPin },
              { label: 'طبيب متطوع', value: '30+', icon: Users },
              { label: 'أهل الخير', value: '500+', icon: Heart },
              { label: 'عيادة متخصصة', value: '12', icon: Award },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary transition-all">
                  <stat.icon className="text-white" size={32} />
                </div>
                <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-white/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. الرؤية والرسالة (Mission & Vision) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">مبادئنا الراسخة</h2>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all text-center border-b-8 border-secondary group">
            <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              <Target className="text-secondary" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">رؤيتنا</h3>
            <p className="text-gray-500 leading-relaxed">
              أن نكون المركز الطبي الخيري الأول في المنطقة، الذي يجمع بين التكنولوجيا الطبية الحديثة وروح التكافل الاجتماعي.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all text-center border-b-8 border-primary group">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              <Heart className="text-primary" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">رسالتنا</h3>
            <p className="text-gray-500 leading-relaxed">
              تقديم رعاية صحية متميزة للمرضى غير القادرين، وتخفيف آلامهم بكرامة تامة، وتوفير التخصصات النادرة في قلب الريف.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all text-center border-b-8 border-accent group">
            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              <Calendar className="text-accent" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">قيمنا</h3>
            <p className="text-gray-500 leading-relaxed">
              الشفافية المطلقة مع المتبرعين، الجودة الطبية التي لا تنازل عنها، والرحمة في التعامل مع كل مريض يطرق بابنا.
            </p>
          </div>

        </div>
      </section>

      {/* 5. دعوة للعمل (CTA) */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary p-12 rounded-[50px] text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">كن جزءاً من رحلة الخير</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto relative z-10">
            مجمع النور قائم بفضل تبرعاتكم.. صدقتك الجارية قد تكون سبباً في إنقاذ حياة إنسان في المحمودية والقرى المجاورة.
          </p>
          <button className="bg-white text-primary px-10 py-4 rounded-full font-black text-lg hover:bg-accent transition-all cursor-pointer relative z-10 shadow-2xl">
            تبرع الآن للمجمع
          </button>
          {/* ديكورات خلفية */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default About;