import React, { useState } from 'react';
import { Search, Calendar, User, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs'; 
import Loading from '../components/common/Loading';
import SEO from '../components/SEO';

const categories = ["الكل", "نصائح طبية", "جراحة", "تغذية", "أخبار المجمع"];

const BlogPage = () => {
  const { data: blogs, isLoading } = useBlogs();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Loading />;

  // منطق الفلترة (تصنيف + بحث)
  const filteredBlogs = blogs?.filter((post: any) => {
    const matchesCategory = activeCategory === "الكل" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-cairo min-h-screen pb-20 bg-site-bg">
      <SEO
        title="مدونة مجمع النور الطبي - نصائح طبية وآخر أخبار المجمع"
        description="تابع أحدث المقالات الطبية والنصائح الصحية من أطباء مجمع النور، بالإضافة إلى أخبار المبادرات والفعاليات المجتمعية."
        keywords="مدونة طبية، نصائح صحية، أخبار مجمع النور، طب، صحة، مقالات طبية، توعية صحية"
      />
      {/* 1. Header Section */}
      <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">مدونة مجمع النور</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            مقالات طبية موثوقة بإشراف نخبة من أطباء المجمع لنشر الوعي الصحي في مجتمعنا.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      </section>

      {/* 2. Search & Categories Bar */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white p-6 rounded-[35px] shadow-xl border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            <Tag size={20} className="text-secondary shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat ? 'bg-secondary text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="ابحث في المقالات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pr-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-secondary/20 font-bold text-primary"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* 3. Blog Grid */}
      <section className="container mx-auto px-4 mt-16">
        {filteredBlogs?.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-sm border border-gray-100">
            <p className="text-2xl text-gray-400 font-bold">لا توجد مقالات تطابق بحثك حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs?.map((post: any) => (
              <article key={post._id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`http://localhost:5000/uploads/${post.image}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={post.title} 
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-primary font-black text-xs">
                     {post.category || 'ثقافة طبية'}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                     <span className="flex items-center gap-1">
                       <Calendar size={14} className="text-secondary" /> 
                       {new Date(post.createdAt).toLocaleDateString('ar-EG')}
                     </span>
                     <span className="flex items-center gap-1">
                       <User size={14} className="text-secondary" /> 
                       {post.author?.name || 'مجمع النور'}
                     </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>

                  <Link 
                    to={`/blogs/${post.slug || post._id}`} 
                    className="mt-auto flex items-center gap-2 text-primary font-black group/link"
                  >
                    اقرأ المزيد 
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center group-hover/link:bg-secondary transition-all">
                      <ArrowLeft size={16} />
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Newsletter Banner */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-secondary rounded-[50px] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <BookOpen size={48} className="mx-auto mb-6 text-accent" />
            <h2 className="text-3xl font-black mb-4">اشترك في النشرة الصحية</h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">احصل على أحدث النصائح الطبية ومواعيد العيادات مباشرة عبر بريدك الإلكتروني.</p>
            <div className="max-w-md mx-auto flex gap-4">
               <input type="email" placeholder="بريدك الإلكتروني" className="flex-grow p-4 rounded-2xl bg-white text-primary outline-none font-bold" />
               <button className="bg-primary px-8 rounded-2xl font-black hover:bg-white hover:text-primary transition-all cursor-pointer">اشترك</button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;