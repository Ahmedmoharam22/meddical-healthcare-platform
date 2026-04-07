import { useParams, Link } from 'react-router-dom';
import { useDoctorsBySpecialty } from '../hooks/useDoctors';
import { Calendar, Clock, ChevronRight, Stethoscope, AlertCircle } from 'lucide-react';
import Loading from '../components/common/Loading';
import SEO from '../components/SEO';

const SpecialtyDetails = () => {
  const { id } = useParams(); // بناخد الـ slug من الـ URL
  const { data: doctors, isLoading } = useDoctorsBySpecialty(id || "");

  if (isLoading) return <Loading />;

  // استخراج اسم التخصص بشكل آمن من أول دكتور يرجع، أو من الـ slug كخطة بديلة
  const specialtyName = doctors && doctors.length > 0 
    ? doctors[0]?.specialty?.name 
    : id?.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-cairo pb-20">
      <SEO
        title={`${specialtyName} - مجمع النور الطبي`}
        description={`أطباء قسم ${specialtyName} في مجمع النور الطبي، تعرف على خبراتهم وجداول العيادات.`}
        keywords={`${specialtyName}, مجمع النور الطبي, أطباء, عيادات, صحة, محمودية`}
      />
      {/* Header Section */}
      <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/specialties" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-secondary mb-6 transition-colors"
          >
            <ChevronRight size={20} /> العودة لكافة التخصصات
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            أطباء قسم <span className="text-secondary">{specialtyName}</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            نخبة من أمهر الأطباء والاستشاريين في مجمع النور الطبي، مكرسين مجهودهم لخدمة أهالي المحمودية والخط الترابي.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* حالة عدم وجود أطباء في هذا القسم */}
        {(!doctors || doctors.length === 0) ? (
          <div className="bg-white rounded-[40px] p-16 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">لا يوجد أطباء متاحين حالياً</h2>
            <p className="text-gray-500">جاري العمل على إضافة طاقم طبي لهذا القسم قريباً في مجمع النور.</p>
            <Link to="/specialties" className="inline-block mt-8 text-secondary font-bold border-b-2 border-secondary">
              تصفح تخصصات أخرى
            </Link>
          </div>
        ) : (
          /* عرض قائمة الأطباء */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc: any) => (
              <div 
                key={doc._id} 
                className="bg-white rounded-[45px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full"
              >
                {/* صورة الدكتور مع تأثير بصري */}
                <div className="h-72 bg-gray-100 relative overflow-hidden">
                  <img 
                    // src={doc.image || '/assets/default-doctor.jpg'} 
                    src={`http://localhost:5000/uploads/${doc.image}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={doc.name} 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-primary font-black text-sm flex items-center gap-2">
                      <Stethoscope size={16} className="text-secondary" />
                      {doc.specialty?.name}
                    </p>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-primary mb-6 group-hover:text-secondary transition-colors">
                    {doc.name}
                  </h3>
                  
                  {/* قسم المواعيد - Rendered Dynamically */}
                  <div className="space-y-4 mb-10 flex-grow">
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={14} className="text-secondary" /> جدول العيادة:
                    </p>
                    {doc.schedule && doc.schedule.length > 0 ? (
                      doc.schedule.map((item: any, idx: number) => (
                        <div 
                          key={idx} 
                          className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-50 group-hover:bg-white group-hover:border-secondary/20 transition-all"
                        >
                          <span className="font-bold text-primary">{item.day}</span>
                          <span className="text-secondary font-bold text-sm flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-lg">
                            <Clock size={14} /> {item.time}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">اتصل بنا لمعرفة المواعيد</p>
                    )}
                  </div>

                  {/* زر الحجز */}
                  <Link to="/appointment" className="w-full py-5 bg-primary text-white rounded-[24px] font-black hover:bg-secondary transition-all shadow-lg hover:shadow-secondary/30 cursor-pointer flex items-center justify-center gap-2 group/btn">
                    احجز موعد الآن
                    <ChevronRight size={18} className="rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyDetails;