import { Calendar, CreditCard, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { title: 'احجز موعدك', icon: <Calendar />, bg: 'bg-primary' },
  { title: 'استشارة طبية', icon: <UserCheck />, bg: 'bg-secondary' },
  { title: 'الدفع', icon: <CreditCard />, bg: 'bg-accent' },
];

const FeatureCards = () => {
  return (
    <div className="container mx-auto px-4 -mt-8 md:-mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-xl rounded-lg overflow-hidden">
       <Link to="/appointment" className={`${features[0].bg} p-8 flex items-center justify-between text-white group hover:opacity-90 cursor-pointer transition`}>
            <span className="text-body-2 font-medium">{features[0].title}</span>
            <div className={`${features[0].bg === 'bg-accent' ? 'text-primary' : 'text-white'} opacity-80 group-hover:scale-110 transition`}>
              {features[0].icon}
            </div>
          </Link>
          <Link to="/diagnose" className={`${features[1].bg} p-8 flex items-center justify-between text-white group hover:opacity-90 cursor-pointer transition`}>
            <span className="text-body-2 font-medium">{features[1].title}</span>
            <div className={`${features[1].bg === 'bg-accent' ? 'text-primary' : 'text-white'} opacity-80 group-hover:scale-110 transition`}>
              {features[1].icon}
            </div>
          </Link>
          <Link to="/appointment" className={`${features[2].bg} p-8 flex items-center justify-between text-white group hover:opacity-90 cursor-pointer transition`}>
            <span className="text-body-2 text-black font-medium">{features[2].title}</span>
            <div className={`${features[2].bg === 'bg-accent' ? 'text-secondary' : 'text-white'} opacity-80 group-hover:scale-110 transition`}>
              {features[2].icon}
            </div>
          </Link>
      </div>
    </div>
  );
};

export default FeatureCards;