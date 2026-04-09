import { X, BookOpen, Award, Calendar } from 'lucide-react';

interface DoctorModalProps {
  doctor: any;
  onClose: () => void;
}

const DoctorProfileModal = ({ doctor, onClose }: DoctorModalProps) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] relative shadow-2xl flex flex-col md:flex-row">
        
        {/* زر القفل */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-10 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* جانب الصورة */}
        <div className="md:w-2/5 h-[300px] md:h-auto relative">
          <img 
            src={`http://localhost:5000/uploads/${doctor.image}`} 
            className="w-full h-full object-cover" 
            alt={doctor.name} 
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary text-white">
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-accent font-medium">
              {typeof doctor.specialty === 'object' ? doctor.specialty.name : doctor.specialty}
            </p>
          </div>
        </div>

        {/* جانب التفاصيل */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-secondary">
              <BookOpen size={24} />
              <h3 className="text-xl font-bold text-primary">نبذة عن الطبيب</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {doctor.bio || "هذا الطبيب متخصص في تقديم أفضل الرعاية الطبية في مجاله، وله خبرة واسعة في علاج الحالات المعقدة باستخدام أحدث التقنيات."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 border border-gray-100">
              <Award className="text-secondary" size={32} />
              <div>
                <h4 className="font-bold text-primary text-sm">الدرجة العلمية</h4>
                <p className="text-gray-500 text-sm">{doctor.title || 'استشاري مجمع النور'}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 border border-gray-100">
              <Calendar className="text-secondary" size={32} />
              <div>
                <h4 className="font-bold text-primary text-sm">مواعيد العمل</h4>
                <p className="text-gray-500 text-sm">
                   {doctor.schedule?.[0]?.day || 'متوفر حالياً'}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              onClose();
              const contactSection = document.getElementById('contact');
              if(contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-10 w-full py-5 bg-secondary text-white font-black rounded-2xl hover:bg-primary transition-all shadow-lg shadow-secondary/20 cursor-pointer"
          >
            احجز موعد الآن مع الدكتور
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;
