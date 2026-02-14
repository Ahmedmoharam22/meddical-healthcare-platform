import {
  ArrowLeft,
  Stethoscope,
  Activity,
  Heart,
  Thermometer,
  Microscope,
  Syringe,
  Baby,
  Bone,
  Eye,
  Droplets,
  FerrisWheel as Skin,
  Pill,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { useServices } from "../../hooks/useServices";
import Loading from "../common/Loading";

// const Services = () => {
//   const { data: services, isLoading } = useServices();

//   // ماب للأيقونات محدثة لتشمل تخصصات مجمع النور الجديدة
//   const iconMap: any = {
//     stethoscope: <Stethoscope size={40} />,
//     activity: <Activity size={40} />,
//     heart: <Heart size={40} />,
//     thermometer: <Thermometer size={40} />,
//     microscope: <Microscope size={40} />,
//     syringe: <Syringe size={40} />,
//     baby: <Baby size={40} />,
//     bone: <Bone size={40} />,
//     eye: <Eye size={40} />,
//     droplets: <Droplets size={40} />,
//     skin: <Skin size={40} />,
//     pill: <Pill size={40} />,
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <section className="py-24 bg-[#FBFBFF]">
//       <div className="container mx-auto px-4 font-cairo">
//         <SectionHeader
//           subtitle="رعاية يمكنك الوثوق بها"
//           title="خدماتنا الطبية"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
//           {services?.map((service) => (
//             <div
//               key={service._id}
//               className="group relative bg-white p-10 rounded-xl transition-all duration-300 hover:-translate-y-2 border-b-4 border-transparent hover:border-secondary shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
//             >
//               {/* Icon Circle */}
//               <div className="w-20 h-20 bg-accent/30 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300 mb-8">
//                 {iconMap[service.icon] || <Stethoscope size={40} />}
//               </div>

//               {/* Text Content */}
//               <h3 className="text-title text-primary font-bold mb-4">
//                 {service.name}
//               </h3>
//               <p className="text-body text-gray-500 mb-8 leading-relaxed line-clamp-3">
//                 {service.description}
//               </p>

//               {/* Dynamic Learn More Link */}
//               <Link
//                 to={`/services/${service.slug}`}
//                 className="inline-flex items-center gap-2 text-button text-primary font-bold group-hover:text-secondary transition-colors"
//               >
//                 المزيد من التفاصيل
//                 <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
//                   <ArrowLeft size={16} />
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;


// ... نفس الـ imports اللي عندك

const Services = () => {
  const { data: services, isLoading } = useServices();

  // ماب للأيقونات (نفس اللي عندك)
  const iconMap: any = { /* ... */ };

  if (isLoading) return <Loading />;

  return (
    <section className="py-24 bg-[#FBFBFF]">
      <div className="container mx-auto px-4 font-cairo">
        
        {/* Header السيكشن مع زرار جانبي للموبايل والديسكتوب */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader
          subtitle="رعاية يمكنك الوثوق بها"
          title="خدماتنا الطبية"
        />
          <Link 
            to="/services" 
            className="hidden md:flex items-center gap-2 bg-white text-primary border-2 border-primary/5 px-8 py-3 rounded-2xl font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 shadow-sm cursor-pointer"
          >
            عرض كافة الخدمات <ArrowLeft size={18} />
          </Link>
        </div>

        {/* عرض أول 3 خدمات فقط باستخدام slice */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {services?.slice(0, 3).map((service) => (
            <div
              key={service._id}
              className="group relative bg-white p-10 rounded-[32px] transition-all duration-500 hover:-translate-y-2 border-b-8 border-transparent hover:border-secondary shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-500 mb-8">
                {iconMap[service.icon] || <Stethoscope size={40} />}
              </div>

              <h3 className="text-2xl text-primary font-bold mb-4">
                {service.name}
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed line-clamp-3">
                {service.description}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary font-bold group-hover:text-secondary transition-colors cursor-pointer"
              >
                المزيد من التفاصيل
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                  <ArrowLeft size={16} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* زرار يظهر في الموبايل فقط تحت الكروت */}
        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-bold cursor-pointer"
          >
            مشاهدة كل الخدمات <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;