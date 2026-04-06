import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart } from 'lucide-react';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-20 pb-8 font-cairo overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* الجزء العلوي: Newsletter */}
        <div className="bg-secondary rounded-[32px] p-8 md:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="z-10 text-center lg:text-right">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">اشترك في نشرتنا الطبية</h3>
            <p className="text-white/80">احصل على آخر النصائح الصحية وأخبار مركز النور مباشرة في بريدك.</p>
          </div>
          <div className="w-full lg:w-1/3 z-10">
            <div className="relative">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full bg-white/10 border border-white/20 p-4 pr-6 rounded-2xl outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/50"
              />
              <button className="absolute left-2 top-2 bottom-2 px-6 bg-white text-primary font-bold rounded-xl hover:bg-accent transition-all cursor-pointer">
                اشترك
              </button>
            </div>
          </div>
          {/* خلفية ديكورية */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* الجزء الأوسط: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Logo showText={true} textColor="text-white"  />
            <p className="text-white/70 leading-relaxed">
              مجمع النور الطبي، نهتم بصحتكم ونقدم أفضل الخدمات الطبية بأحدث التقنيات العالمية وتحت إشراف نخبة من الخبراء.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all cursor-pointer">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute bottom-[-8px] right-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-4">
                <Link className='text-white/70 hover:text-secondary flex items-center gap-2 transition-all cursor-pointer group' to="/" key="home">
                    <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" /> الرئيسية
                </Link>
                <Link className='text-white/70 hover:text-secondary flex items-center gap-2 transition-all cursor-pointer group' to="/about" key="about">
                    <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" /> عن المركز
                </Link>
                <Link className='text-white/70 hover:text-secondary flex items-center gap-2 transition-all cursor-pointer group' to="/doctors" key="doctors">
                    <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" /> الأطباء
                </Link>
                <Link className='text-white/70 hover:text-secondary flex items-center gap-2 transition-all cursor-pointer group' to="/services" key="services">
                    <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" /> الخدمات
                </Link>
                <Link className='text-white/70 hover:text-secondary flex items-center gap-2 transition-all cursor-pointer group' to="/blogs" key="blogs">
                    <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" /> المقالات
                </Link>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              تواصل معنا
              <span className="absolute bottom-[-8px] right-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="text-secondary"><MapPin size={20} /></div>
                <span className="text-white/70">المحموديه، الدقهليه، مجمع النور الطبي</span>
              </li>
              <li className="flex gap-4">
                <div className="text-secondary"><Phone size={20} /></div>
                <span className="text-white/70">0123-456-789</span>
              </li>
              <li className="flex gap-4">
                <div className="text-secondary"><Mail size={20} /></div>
                <span className="text-white/70">info@alnoor.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative inline-block">
              مواعيد العمل
              <span className="absolute bottom-[-8px] right-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h4>
            <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">السبت - الخميس:</span>
                <span className="font-bold text-accent">08:00 ص - 10:00 م</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">الجمعة:</span>
                <span className="font-bold text-red-400">مغلق (للطوارئ فقط)</span>
              </div>
            </div>
          </div>

        </div>

        {/* الجزء السفلي: Copyrights */}
        <div className="pt-8 border-t border-white/5 text-center md:flex md:justify-between items-center text-white/40 text-sm">
          <p>© {currentYear} مجمع النور الطبي. جميع الحقوق محفوظة.</p>
          <p className="mt-4 md:mt-0 flex items-center justify-center gap-1">
            صنع بكل <Heart size={14} className="text-red-500 fill-red-500" /> A7med Mo7aram
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;