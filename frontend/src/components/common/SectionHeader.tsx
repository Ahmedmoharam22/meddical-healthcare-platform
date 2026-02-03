interface SectionHeaderProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

const SectionHeader = ({ title, subtitle, center = true }: SectionHeaderProps) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <h5 className="text-caption text-secondary uppercase tracking-widest mb-2">
        {subtitle}
      </h5>
      <h2 className="text-display-2 text-primary">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;