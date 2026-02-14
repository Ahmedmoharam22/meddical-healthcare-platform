import React, { useState } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { useSpecialties } from '../hooks/useSpecialties';
import { Search, Filter, Calendar, Clock, Award, Stethoscope } from 'lucide-react';
import Loading from '../components/common/Loading';
import DoctorModal from '../components/common/DoctorModal';

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
      {/* 1. Hero Section */}
      <section className="bg-primary pt-32 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">نخبة أطباء مجمع النور</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            نضم مجموعة من أفضل الاستشاريين والأخصائيين الملتزمين بتقديم أعلى مستويات الرعاية الطبية لأهالينا.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2"></div>
      </section>

      {/* 2. Filter Bar - شريط التحكم */}
      <div className="container mx-auto px-4 -mt-10 relative z-30">
        <div className="bg-white p-6 rounded-[30px] shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-6 items-center">
          {/* البحث */}
          <div className="relative flex-grow w-full">
            <input 
              type="text"
              placeholder="ابحث عن طبيب بالاسم..."
              className="w-full p-4 pr-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-bold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* فلتر التخصصات */}
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <Filter size={20} className="text-secondary shrink-0" />
            <button 
              onClick={() => setSelectedSpecialty('all')}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedSpecialty === 'all' ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              الكل
            </button>
            {specialties?.map((spec: any) => (
              <button 
                key={spec._id}
                onClick={() => setSelectedSpecialty(spec._id)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedSpecialty === spec._id ? 'bg-secondary text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Doctors Grid */}
      <section className="container mx-auto px-4 mt-16">
        {filteredDoctors?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
            <p className="text-2xl text-gray-400 font-bold">لم يتم العثور على أطباء بهذا البحث..</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors?.map((doc: any) => (
              <div 
                key={doc._id} 
                className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col"
              >
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden bg-gray-100">
                  <img 
                    src={`http://localhost:5000/uploads/${doc.image}`} 
                    alt={doc.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl">
                    <Award className="text-secondary" size={20} />
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-xs font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-lg">
                      {doc.specialty?.name || 'تخصص عام'}
                    </span>
                    <h3 className="text-2xl font-bold text-primary mt-2 group-hover:text-secondary transition-colors">
                      {doc.name}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock size={16} className="text-accent" />
                      <span>{doc.schedule?.[0]?.day || 'المواعيد: اتصل بنا'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Stethoscope size={16} className="text-accent" />
                      <span className="line-clamp-1">{doc.title || 'استشاري مجمع النور'}</span>
                    </div>
                  </div>

                  <button    onClick={() => setSelectedDoctor(doc)} className="mt-auto w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-secondary hover:shadow-lg hover:shadow-secondary/30 transition-all active:scale-95 cursor-pointer">
                    عرض الملف الشخصي
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
         <DoctorModal  
                  doctor={selectedDoctor} 
                  onClose={() => setSelectedDoctor(null)} 
                />
      </section>
    </div>
  );
};

export default DoctorsPage;