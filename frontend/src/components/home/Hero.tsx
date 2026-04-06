import { Link } from 'react-router-dom';
import heroImage from '../../assets/Hero-image.png'; 
const Hero = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})` 
        }}
      >
        {/* Overlay لضمان وضوح الكلام */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto h-full flex items-center relative z-10 px-4">
        <div className="max-w-2xl">
          {/* Caption */}
          <h5 className="text-caption text-secondary uppercase tracking-widest mb-2">
           رعاية من أجل الحياة
          </h5>
          
          {/* Main Title - Display 1 */}
          <h1 className="text-display-1 text-primary mb-8 leading-tight">
           نحن نقود الطريق <br />
  في التميز الطبي
          </h1>

          {/* Button - Text Button Style */}
          <Link to="/services" className="bg-accent cursor-pointer text-primary px-8 py-3 rounded-full text-button font-medium hover:bg-primary hover:text-white transition duration-300 shadow-md">
            خدماتنا 
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;