
const PageHeader = ({ title, subtitle, description }) => {
  return (
    <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-display-3 md:text-display-2 text-white font-black mb-6 uppercase tracking-tighter">
          {title} <br/> 
          <span className="text-secondary text-3xl md:text-5xl italic">
            {subtitle}
          </span>
        </h1>
        <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      </div>
      {/* الدائرة الديكورية اللي في الخلفية */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PageHeader;