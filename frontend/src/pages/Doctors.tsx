import React, { useState } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { useSpecialties } from '../hooks/useSpecialties';
import { Search, Filter, Calendar, Clock, Award, Stethoscope } from 'lucide-react';
import Loading from '../components/common/Loading';
import DoctorModal from '../components/common/DoctorModal';
import SEO from '../components/SEO';
import PageHeader from '../components/common/PageHeader';
const DoctorsPage = () => {
  const { data: doctors, isLoading: docsLoading } = useDoctors();
  const { data: specialties } = useSpecialties();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  if (docsLoading) return <Loading />;

  // منطق الفلترة (بحث + تخصص)
  const filteredDoctors = doctors?.filter((doc: any) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty?._id === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="font-cairo bg-[#F8FAFC] min-h-screen pb-20">
      <SEO
       title="أطباء مجمع النور الطبي - نخبة الاستشاريين والأخصائيين"
        description="تعرف على نخبة أطباء مجمع النور الطبي، استشاريين وأخصائيين في مختلف التخصصات، واحجز موعدك اليوم."
        keywords="أطباء، استشاريين، أخصائيين، مجمع النور الطبي، طب، صحة، عيادات، تخصصات"
      />

      {/* 1. Hero Section */}
      <PageHeader 
        title="أطباء مجمع النور"
        subtitle="نخبة من الأطباء في خدمتك"
        description="يضم مجمع النور نخبة من الأطباء والاستشاريين في مختلف التخصصات، الذين يجمعون بين الخبرة والكفاءة لتقديم أعلى مستوى من الرعاية الصحية لأهالي المحمودية وميت فارس وعرب شراويد."
      />

      {/* 2. Filter Bar */}
      <div className="container mx-auto px-4 -mt-12 relative z-30">
        <div className="bg-white p-6 rounded-[35px] shadow-2xl border border-gray-50 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <input 
              type="text"
              placeholder="ابحث عن طبيب بالاسم أو التخصص..."
              className="w-full p-5 pr-14 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary/20 focus:bg-white outline-none transition-all font-bold text-primary"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto py-2 no-scrollbar">
            <div className="bg-secondary/10 p-3 rounded-xl text-secondary shrink-0">
               <Filter size={20} />
            </div>
            <button 
              onClick={() => setSelectedSpecialty('all')}
              className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all ${selectedSpecialty === 'all' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              كل التخصصات
            </button>
            {specialties?.map((spec: any) => (
              <button 
                key={spec._id}
                onClick={() => setSelectedSpecialty(spec._id)}
                className={`px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all ${selectedSpecialty === spec._id ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Doctors Grid */}
      <section className="container mx-auto px-4 mt-20">
        {filteredDoctors?.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[50px] shadow-sm border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <Search size={40} className="text-gray-300" />
            </div>
            <p className="text-2xl text-gray-400 font-black">عذراً، لم نجد أطباء يطابقون بحثك حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredDoctors?.map((doc: any) => (
              <div 
                key={doc._id} 
                className="group bg-white rounded-[45px] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-500 border border-gray-100 flex flex-col transform hover:-translate-y-2"
              >
                <div className="h-72 relative overflow-hidden bg-gray-200">
                  <img 
                    src={`http://localhost:5000/uploads/${doc.image}`} 
                    alt={doc.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                    <Award className="text-secondary" size={18} />
                    <span className="text-xs font-black text-primary">استشاري</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-6 text-right">
                    <span className="inline-block text-[10px] font-black text-secondary uppercase tracking-[2px] bg-secondary/10 px-4 py-1.5 rounded-full mb-3">
                      {doc.specialty?.name || 'تخصص عام'}
                    </span>
                    <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors line-clamp-1">
                      د. {doc.name}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                         <Clock size={16} />
                      </div>
                      <span>{doc.schedule?.[0]?.day || 'مواعيد متغيرة'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary/40">
                         <Stethoscope size={16} />
                      </div>
                      <span className="line-clamp-1">{doc.title || 'عضو هيئة التدريس بمجمع النور'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedDoctor(doc)} 
                    className="mt-auto w-full py-5 bg-primary text-white rounded-[22px] font-black text-lg hover:bg-secondary hover:shadow-xl hover:shadow-secondary/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    حجز موعد كشف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* المودال اللي هيفتح فيه الفورم */}
        <DoctorModal  
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      </section>
    </div>
  );
};

export default DoctorsPage;