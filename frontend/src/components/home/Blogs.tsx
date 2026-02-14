import { Calendar, ArrowRight, Eye, Clock } from 'lucide-react';
import { useBlogs } from '../../hooks/useBlogs';
import Loading from '../common/Loading';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const News = () => {
  const { data: blogs, isLoading } = useBlogs();

  if (isLoading) return <Loading />;

  return (
    <section id="news" className="py-24 bg-white font-cairo">
      <div className="container mx-auto px-4">
        
        {/* Header السيكشن */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">المركز الإعلامي</h4>
            <h2 className="text-display-2 text-primary font-bold">آخر المقالات الطبية</h2>
            <div className="w-20 h-1.5 bg-accent mt-4 rounded-full"></div>
          </div>
          <button className="bg-white text-primary border-2 border-primary/10 px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer group">
            مشاهدة المدونة بالكامل <ArrowRight size={18} className="group-hover:-translate-x-1 transition-transform"/>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* المقال الرئيسي (Featured) */}
          {blogs?.[0] && (
            <div className="lg:col-span-7 group cursor-pointer">
              <div className="relative h-[450px] overflow-hidden rounded-[40px] mb-6 shadow-md">
                <img 
                  src={blogs[0].image} 
                  alt={blogs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-secondary text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  {blogs[0].category}
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                  <Calendar size={16} className="text-secondary" /> 
                  {format(new Date(blogs[0].createdAt), 'dd MMMM yyyy', { locale: ar })}
                </span>
                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                  <Eye size={16} className="text-secondary" /> 
                  {blogs[0].views} مشاهدة
                </span>
              </div>

              <h3 className="text-3xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                {blogs[0].title}
              </h3>
              <p className="text-secondary font-medium mb-4 italic">{blogs[0].subTitle}</p>
              <p className="text-gray-600 leading-relaxed line-clamp-2 mb-6">
                {blogs[0].content}
              </p>
              <button className="text-primary font-black flex items-center gap-2 cursor-pointer hover:text-secondary transition-colors">
                اقرأ المقال كاملاً <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* قائمة المقالات الجانبية */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {blogs?.slice(1, 4).map((blog) => (
              <div key={blog._id} className="group flex gap-5 cursor-pointer items-start p-2 rounded-[24px] hover:bg-gray-50 transition-colors">
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-2xl shadow-sm">
                  <img 
                    src={blog.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={blog.title} 
                  />
                </div>
                <div className="flex flex-col gap-1 py-1">
                  <span className="text-[11px] text-secondary font-black uppercase tracking-tighter">
                    {blog.category}
                  </span>
                  <h4 className="text-md font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-gray-400 text-[12px]">
                    <span className="flex items-center gap-1"><Clock size={12} /> {format(new Date(blog.createdAt), 'dd MMMM', { locale: ar })}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {blog.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default News;