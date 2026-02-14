import * as Icons from 'lucide-react';
import { useServices } from '../hooks/useServices';
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';

const Services = () => {
  const { services, isLoading } = useServices();

  if (isLoading) return <Loading />;

  return (
    <div className="font-cairo bg-[#F8FAFC]">
      <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-display-3 md:text-display-2 text-white font-black mb-6 uppercase tracking-tighter">
            خدمات مجمع النور <br/> <span className="text-secondary text-3xl md:text-5xl italic font-serif">رعاية صحية بقلب خيري</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
            نجمع بين كفاءة الأطباء وأحدث التجهيزات لنقدم لكم خدمة طبية تليق بأهالينا في المحمودية.
          </p>
        </div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

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