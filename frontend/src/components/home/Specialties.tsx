// import { 
//   Brain, Bone, Eye, HeartPulse, Refrigerator as Stomach, 
//   Stethoscope, Activity, User, 
//   Ear, Droplets, Baby 
// } from 'lucide-react';
// import Loading from '../common/Loading';
// import SectionHeader from '../common/SectionHeader';
// import { useSpecialties } from '../../hooks/useSpecialties';

// const Specialties = () => {
//   const { data: specialties, isLoading } = useSpecialties();

//   // خريطة الأيقونات بناءً على الداتا اللي عربناها سوا
//   const iconMap: any = {
//     'brain': <Brain size={32} />,
//     'bone': <Bone size={32} />,
//     'eye': <Eye size={32} />,
//     'heart-beat': <HeartPulse size={32} />,
//     'stomach': <Stomach size={32} />,
//     'heart-pulse': <HeartPulse size={32} />,
//     'cancer': <Activity size={32} />,
//     // 'lungs': <Lungs size={32} />,
//     'skin': <User size={32} />,
//     'ear': <Ear size={32} />,
//     'kidney': <Droplets size={32} />,
//     'uterus': <Baby size={32} />,
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <section className="py-24 bg-white font-cairo">
//       <div className="container mx-auto px-4">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//          <SectionHeader subtitle="تخصصاتنا" title="التخصصات الطبية" />
//         </div>

//         {/* Specialties Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {specialties?.map((spec, index) => (
//             <div 
//               key={index}
//               className="group p-8 border border-gray-100 rounded-2xl transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer"
//             >
//               {/* Icon Container */}
//               <div className="w-20 h-20 bg-accent/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
//                 {iconMap[spec.icon] || <Stethoscope size={32} />}
//               </div>

//               {/* Text */}
//               <h3 className="text-title text-primary font-bold mb-3 group-hover:text-white transition-colors">
//                 {spec.name}
//               </h3>
//               <p className="text-small text-gray-500 group-hover:text-accent transition-colors leading-relaxed">
//                 {spec.description}
//               </p>

//               {/* Minimal Line Decoration */}
//               <div className="mt-6 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-500"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Specialties;


import { 
  Brain, Bone, Eye, HeartPulse, Refrigerator as Stomach, 
  Stethoscope, Activity, User, 
  Ear, Droplets, Baby, ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom'; // ضفنا الـ Link
import Loading from '../common/Loading';
import SectionHeader from '../common/SectionHeader';
import { useSpecialties } from '../../hooks/useSpecialties';

const Specialties = () => {
  const { data: specialties, isLoading } = useSpecialties();

  const iconMap: any = {
    'brain': <Brain size={32} />,
    'bone': <Bone size={32} />,
    'eye': <Eye size={32} />,
    'heart-beat': <HeartPulse size={32} />,
    'stomach': <Stomach size={32} />,
    'heart-pulse': <HeartPulse size={32} />,
    'cancer': <Activity size={32} />,
    'skin': <User size={32} />,
    'ear': <Ear size={32} />,
    'kidney': <Droplets size={32} />,
    'uterus': <Baby size={32} />,
  };

  if (isLoading) return <Loading />;

  return (
    <section className="py-24 bg-white font-cairo">
      <div className="container mx-auto px-4">
        
        {/* Header مع زرار "مشاهدة الكل" الجانبي */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader subtitle="تخصصاتنا" title="التخصصات الطبية" className="mb-0 text-right" />
          
          <Link 
            to="/specialties" 
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all group cursor-pointer"
          >
            مشاهدة جميع التخصصات 
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
          </Link>
        </div>

        {/* العرض لـ 4 تخصصات فقط */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties?.slice(0, 4).map((spec, index) => (
            <div 
              key={index}
              className="group p-8 border border-gray-100 rounded-[32px] transition-all duration-500 hover:bg-primary hover:border-primary hover:shadow-2xl hover:-translate-y-3 flex flex-col items-center text-center cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-accent/20 text-primary rounded-[24px] flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500">
                {iconMap[spec.icon] || <Stethoscope size={32} />}
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