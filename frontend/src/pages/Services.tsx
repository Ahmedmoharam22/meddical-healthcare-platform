import * as Icons from 'lucide-react';
import { useServices } from '../hooks/useServices';
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/common/PageHeader';
const Services = () => {
  const { services, isLoading } = useServices();

  if (isLoading) return <Loading />;

  return (
    <div className="font-cairo bg-site-bg">
      <SEO
        title="خدمات مجمع النور الطبي - رعاية صحية متكاملة"
        description="اكتشف خدمات مجمع النور الطبي الشاملة في المحمودية، من العيادات المتخصصة إلى الأجهزة الحديثة والخدمات الطبية المتميزة."
        keywords="خدمات طبية، مجمع النور الطبي، عيادات، أطباء، صحة، محمودية، خدمات خيرية"
      />
     <PageHeader 
  title="خدمات مجمع النور"
  subtitle="رعاية صحية بقلب خيري"
  description="نجمع بين كفاءة الأطباء وأحدث التجهيزات لنقدم لكم خدمة طبية تليق بأهالينا في المحمودية."
/>

      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services?.map((service: any) => {
            const IconComponent = (Icons as any)[service.icon || 'Stethoscope'] || Icons.Stethoscope;

            return (
              <div key={service._id} className="group bg-white rounded-[45px] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 relative flex flex-col h-full overflow-hidden">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:rotate-6 transition-all duration-500">
                  <IconComponent className="text-primary group-hover:text-white transition-colors" size={40} />
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-3 text-primary font-black group/link">
                  <span className="border-b-2 border-transparent group-hover/link:border-secondary transition-all">عرض كافة التفاصيل</span>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover/link:bg-secondary transition-colors">
                    <Icons.ArrowRight size={18} />
                  </div>
                </Link>

                <div className="absolute top-10 left-10 text-gray-50 -z-0 opacity-0 group-hover:opacity-10 shadow-inner group-hover:opacity-10 transition-opacity">
                   <IconComponent size={120} strokeWidth={1} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;