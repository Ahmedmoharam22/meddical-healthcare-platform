import React, { useState } from 'react';
import { Facebook, Instagram, ArrowLeft } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import Loading from '../common/Loading';
import { Link } from 'react-router-dom';
import DoctorModal from '../common/DoctorModal';

const Doctors = () => {
  const { data: doctors, isLoading } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  if (isLoading) return <Loading />;

  return (
    <section id="doctors" className="py-24 bg-[#F8FAFC] font-cairo">
      <div className="container mx-auto px-4">
        
        {/* Header السيكشن */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">نخبة الخبراء</h4>
            <h2 className="text-display-2 text-primary font-bold">تعرف على أفضل أطباء مجمع النور</h2>
            <div className="w-20 h-1.5 bg-accent mt-4 rounded-full"></div>
          </div>
          
          {/* رابط يودي لصفحة الدكاترة الكبيرة */}
          <Link 
            to="/doctors" 
            className="bg-white text-primary border-2 border-primary/10 px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            عرض كل الأطباء <ArrowLeft size={18} />
          </Link>
        </div>

        {/* شبكة الأطباء - عرض 4 فقط */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors?.slice(0, 4).map((doc: any) => (
            <div key={doc._id} className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
              <div className="relative h-[350px] overflow-hidden">
                <img src={`http://localhost:5000/uploads/${doc.image}`} alt={doc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                   <a href="#" className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Facebook size={20} /></a>
                   <a href="#" className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Instagram size={20} /></a>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">{doc.name}</h3>
                <p className="text-secondary font-bold text-sm uppercase tracking-wide mb-4">
                  {typeof doc.specialty === 'object' ? doc.specialty.name : doc.specialty}
                </p>
                
                <button 
                  onClick={() => setSelectedDoctor(doc)}
                  className="cursor-pointer w-full py-3 bg-accent/20 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                >
                  عرض الملف الشخصي
                </button>
              </div>
            </div>
          ))}
        </div>
        <DoctorModal  
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      </div>
    </section>
  );
};

export default Doctors;