import { useState } from "react";
import { Search, Clock, PhoneCall, MapPin, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../common/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "خدماتنا", path: "/services" },
    { name: "التخصصات", path: "/specialties" },
    { name: "الأطباء", path: "/doctors" },
    { name: "المقالات", path: "/blogs" },
    { name: "تواصل معنا", path: "/contact" },
    { name: "شخّص حالتك", path: "/diagnose" },
    { name: "الصيدلية", path: "/pharmacy" },
  ];

  return (
    <header className="w-full flex flex-col font-cairo shadow-sm" dir="rtl">
      {/* 1. Top Header - مخفي في الموبايل الصغير جداً لتحسين المساحة */}
      <div className="bg-white py-3 border-b border-gray-100 hidden lg:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* اللوجو */}
          <Link to="/" className="text-3xl text-primary font-black tracking-tighter">
         <Logo showText={true} textColor="text-primary"  />
          </Link>

          {/* معلومات التواصل - مخفية تحت الـ 1024px */}
          <div className="flex items-center gap-8">
            <InfoBlock icon={<PhoneCall size={20} />} title="الطوارئ" value="045-3612-255" color="text-red-500" />
            <InfoBlock icon={<Clock size={20} />} title="ساعات العمل" value="09:00 - 20:00 يومياً" />
            <InfoBlock icon={<MapPin size={20} />} title="موقعنا" value="المحمودية، البحيرة" />
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-primary sticky top-0 z-[100] shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* موبايل لوجو (يظهر فقط في الشاشات الصغيرة) */}
            <Link to="/" className="lg:hidden text-2xl text-white font-black">
               مجمع<span className="text-secondary"> النور</span>
            </Link>

            {/* الروابط للشاشات الكبيرة (Laptops & Desktops) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-6 text-white font-bold h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 hover:text-secondary ${
                    pathname === link.path ? "text-secondary bg-white/5" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* الأزرار اليمين (بحث + حجز) */}
            <div className="flex items-center gap-3 lg:gap-6">
              <button className="text-white hover:text-secondary p-2 transition">
                <Search size={22} />
              </button>
              
              <Link
                to="/appointment"
                className="hidden sm:block bg-secondary text-primary px-6 py-2.5 rounded-xl font-black hover:bg-white transition-all duration-300 shadow-lg active:scale-95"
              >
                احجز موعدك
              </Link>

              {/* زر المنيو للموبايل والتابلت */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Sidebar Menu (تفتح بالجنب أو تنزل لتحت) */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-primary-dark ${isOpen ? "max-h-screen py-6" : "max-h-0"}`}>
          <div className="flex flex-col px-6 gap-4 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold py-2 ${pathname === link.path ? "text-secondary" : "text-white/80"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              onClick={() => setIsOpen(false)}
              className="bg-secondary text-primary text-center py-4 rounded-2xl font-black mt-4"
            >
              احجز موعدك الآن
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// كومبوننت فرعي للمعلومات العلوية
const InfoBlock = ({ icon, title, value, color = "text-secondary" }: any) => (
  <div className="flex items-center gap-3">
    <div className={color}>{icon}</div>
    <div className="flex flex-col">
      <span className="text-[12px] text-primary font-black leading-tight uppercase tracking-wide opacity-60">
        {title}
      </span>
      <span className="text-primary font-bold text-sm">
        {value}
      </span>
    </div>
  </div>
);

export default Navbar;