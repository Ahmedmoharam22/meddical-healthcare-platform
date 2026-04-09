import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center"
      dir="rtl"
    >
      {/* CSS-only layered background */}
      {/* Base gradient — light slate to soft blue, fitting a medical theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" />

      {/* Subtle radial glow at top-right for depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(186,230,253,0.7) 0%, transparent 70%)',
        }}
      />

      {/* Decorative grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#0369a1 1px, transparent 1px), linear-gradient(to right, #0369a1 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Decorative circle — bottom left */}
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, rgba(14,165,233,0.8) 0%, transparent 70%)',
        }}
      />

      {/* Thin top accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700" />

      {/* Content */}
      <div className="container mx-auto relative z-10 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl">

          {/* Caption with a decorative left border */}
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-0.5 bg-cyan-500 rounded-full" />
            <h5 className="text-caption text-secondary uppercase tracking-widest text-sm md:text-base font-semibold text-cyan-600">
              رعاية من أجل الحياة
            </h5>
          </div>

          {/* Main Title */}
          <h1
            className="text-display-1 text-primary mb-8 leading-snug font-bold
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       text-slate-800"
          >
            نحن نقود الطريق <br />
            <span className="text-secondary">في التميز الطبي</span>
          </h1>

          {/* Supporting line for visual richness */}
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-8" />

          {/* CTA Button */}
          <Link
            to="/services"
            className="
              inline-block
              bg-primary text-white
              px-8 py-3.5
              rounded-full
              text-button font-medium text-base
              hover:bg-secondary
              transition-all duration-300
              shadow-lg shadow-blue-200
              hover:shadow-xl hover:shadow-blue-300
              hover:-translate-y-0.5
            "
          >
            خدماتنا
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;