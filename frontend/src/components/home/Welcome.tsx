import { ArrowLeft } from 'lucide-react'; // غيرنا السهم للشمال عشان العربي
import welcomeImage from '../../assets/welcome-banner.png'; 

const Welcome = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Content Area - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-caption text-secondary uppercase tracking-widest mb-4">
            مرحباً بكم في مجمع النور الطبي
          </h5>
          <h2 className="text-display-2 text-primary mb-6">
            مكان متميز لتقديم أفضل رعاية صحية
          </h2>
          <p className="text-body-2 text-gray-500 leading-relaxed mb-8 font-medium">
            نحن نلتزم بتقديم أعلى مستويات الرعاية الطبية من خلال نخبة من الكوادر المصرية المتخصصة، 
            باستخدام أحدث التقنيات لضمان سلامتك وسلامة عائلتك. مهمتنا هي توفير بيئة علاجية 
            آمنة ومريحة لكل مريض.
          </p>
          
          {/* Learn More Link */}
          <button className="flex items-center gap-2 mx-auto text-secondary text-button font-bold hover:gap-4 transition-all">
            اقرأ المزيد <ArrowLeft size={18} />
          </button>
        </div>

        {/* Wide Image Section */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={welcomeImage} 
            alt="فريق مجمع النور الطبي" 
            className="w-full h-auto object-cover max-h-500px"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;