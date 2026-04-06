import { Stethoscope, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import SectionHeader from '../common/SectionHeader';
import { useSpecialties } from '../../hooks/useSpecialties';

const Specialties = () => {
  const { data: specialties, isLoading } = useSpecialties();



  if (isLoading) return <Loading />;

  return (
    <section className="py-24 bg-white font-cairo">
      <div className="container mx-auto px-4">
        
        {/* Header مع زرار "مشاهدة الكل" الجانبي */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader subtitle="تخصصاتنا" title="التخصصات الطبية" className="mb-0 text-right" />
          
          <Link 
            to="/specialties" 
            className="bg-white text-primary border-2 border-primary/10 px-8 py-3 rounded-full font-bold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            مشاهدة جميع التخصصات 
              <ArrowLeft size={18} />
          </Link>
        </div>

        {/* العرض لـ 4 تخصصات فقط */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties?.slice(0, 4).map((spec, index) => (
            <div 
              key={index}
              className="group p-8 border border-gray-100 rounded-[32px] transition-all duration-500 hover:bg-primary hover:border-primary hover:shadow-2xl hover:-translate-y-3 flex flex-col items-center text-center cursor-pointer"
            >
              {/* Icon Container - icon field stores emoji directly */}
              <div className="w-20 h-20 bg-accent/20 text-primary rounded-[24px] flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500">
                {spec.icon
                  ? <span className="text-4xl leading-none select-none">{spec.icon}</span>
                  : <Stethoscope size={32} />}
              </div>

              {/* Text */}
              <h3 className="text-xl text-primary font-bold mb-3 group-hover:text-white transition-colors">
                {spec.name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-accent/90 transition-colors leading-relaxed line-clamp-2">
                {spec.description}
              </p>

              {/* Minimal Line Decoration */}
              <div className="mt-8 w-12 h-1.5 bg-secondary/20 rounded-full group-hover:w-full group-hover:bg-secondary transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* زرار الموبايل */}
        <div className="mt-12 text-center md:hidden">
           <Link to="/specialties" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold">
             كل التخصصات <ArrowLeft size={18} />
           </Link>
        </div>

      </div>
    </section>
  );
};

export default Specialties;