import { Search  , Clock , PhoneCall, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   <header className="w-full flex flex-col">
      {/* 1. Top Header: Info Section */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo on the Left */}
          <Link to="/" className="text-display-2 text-primary font-bold tracking-tighter uppercase">
            Med<span className="text-secondary">dical</span>
          </Link>

          {/* Info Blocks - Right Side */}
          <div className="flex flex-wrap justify-center md:justify-end gap-8">
            {/* Emergency */}
            <div className="flex items-center gap-3">
              <div className="text-secondary"><PhoneCall /></div>
              <div className="flex flex-col">
                <span className="text-button text-primary uppercase">Emergency</span>
                <span className="text-secondary font-medium text-small">(237) 681-812-255</span>
              </div>
            </div>

            {/* Work Hour */}
            <div className="flex items-center gap-3">
              <div className="text-secondary"><Clock /></div>
              <div className="flex flex-col">
                <span className="text-button text-primary uppercase">Work Hour</span>
                <span className="text-secondary font-medium text-small">09:00 - 20:00 Everyday</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="text-secondary"><MapPin /></div>
              <div className="flex flex-col">
                <span className="text-button text-primary uppercase">Location</span>
                <span className="text-secondary font-medium text-small">0123 Some Place</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-primary sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-1">
          
          {/* Nav Links - Left Side */}
          <ul className="hidden md:flex items-center space-x-8 text-white text-body font-medium">
            <li><Link to="/" className="hover:text-secondary transition py-4 inline-block">Home</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition py-4 inline-block">About us</Link></li>
            <li><Link to="/services" className="hover:text-secondary transition py-4 inline-block">Services</Link></li>
            <li><Link to="/doctors" className="hover:text-secondary transition py-4 inline-block">Doctors</Link></li>
            <li><Link to="/news" className="hover:text-secondary transition py-4 inline-block">News</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition py-4 inline-block">Contact</Link></li>
          </ul>

          {/* Search & Appointment - Right Side */}
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-secondary transition cursor-pointer">
               <Search size={22} />
            </button>
            <Link 
              to="/appointment" 
              className="bg-accent text-primary px-8 py-3 rounded-full text-button font-medium hover:bg-white transition duration-300"
            >
              Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;