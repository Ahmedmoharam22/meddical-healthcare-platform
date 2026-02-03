import { useServices } from '../../hooks/useServices';
import SectionHeader from '../common/SectionHeader';

const Services = () => {

const { data: services, isLoading, error } = useServices();
if (isLoading) return <div className="text-center py-20">Loading Services...</div>;
if (error) return <div className="text-center py-20 text-red-500">Error loading services</div>;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* استخدام الكومبوننت اللي عملناه */}
        <SectionHeader 
          subtitle="Care you can believe in" 
          title="Our Services" 
        />

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div 
              key={service._id} 
              className="border border-gray-100 p-8 rounded-lg hover:shadow-xl transition-all group cursor-pointer text-center"
            >
              <div className="mb-6 flex justify-center text-secondary group-hover:text-primary transition">
                <i className={`${service.icon} text-4xl`}></i>
              </div>
              <h4 className="text-title text-primary mb-4">{service.name}</h4>
              <p className="text-body text-gray-500 mb-6">
                {service.description.substring(0, 100)}...
              </p>
              <button className="text-button text-secondary font-medium hover:underline">
                Learn More
              </button>
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
};

export default Services;