import { Calendar, CreditCard, UserCheck } from 'lucide-react';

const features = [
  { title: 'Book an Appointment', icon: <Calendar />, bg: 'bg-primary' },
  { title: 'Book an Appointment', icon: <UserCheck />, bg: 'bg-secondary' },
  { title: 'Book an Appointment', icon: <CreditCard />, bg: 'bg-accent' },
];

const FeatureCards = () => {
  return (
    <div className="container mx-auto px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-xl rounded-lg overflow-hidden">
        {features.map((item, index) => (
          <div 
            key={index} 
            className={`${item.bg} p-8 flex items-center justify-between text-white group hover:opacity-90 cursor-pointer transition`}
          >
            <span className="text-body-2 font-medium">{item.title}</span>
            <div className={`${item.bg === 'bg-accent' ? 'text-primary' : 'text-white'} opacity-80 group-hover:scale-110 transition`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;