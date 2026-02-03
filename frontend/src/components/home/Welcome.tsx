import { ArrowRight } from 'lucide-react';
import welcomeImage from '../../assets/welcome-banner.png'; 

const Welcome = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Content Area - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-caption text-secondary uppercase tracking-widest mb-4">
            Welcome to Meddical
          </h5>
          <h2 className="text-display-2 text-primary mb-6">
            A Great Place to Receive Care
          </h2>
          <p className="text-body-2 text-gray-500 leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat 
            scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. 
            Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
          </p>
          
          {/* Learn More Link */}
          <button className="flex items-center gap-2 mx-auto text-secondary text-button font-medium hover:gap-4 transition-all">
            Learn More <ArrowRight size={18} />
          </button>
        </div>

        {/* Wide Image Section */}
        <div className="w-full rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={welcomeImage} 
            alt="Medical Team" 
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;