import type { SectionHeaderProps } from "../../types";

const SectionHeader = ({ title, subtitle, center = true }: SectionHeaderProps) => {
  return (
    <div className={`mb-8 lg:mb-12 px-4 ${
      center 
        ? 'text-center' 
        : 'text-center lg:text-right' 
    }`}>
      <h5 className="text-sm lg:text-caption text-secondary uppercase tracking-[0.2em] mb-2 font-bold">
        {subtitle}
      </h5>

      <h2 className="text-3xl md:text-4xl lg:text-display-2 text-primary leading-tight font-black">
        {title}
      </h2>
      
      <div className={`h-1 w-12 bg-secondary mt-4 rounded-full ${center ? 'mx-auto' : 'mr-auto lg:mr-0 lg:ml-auto'}`} />
    </div>
  );
};

export default SectionHeader;