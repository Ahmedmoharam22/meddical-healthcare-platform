import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSingleBlog } from '../hooks/useBlogs';
import { Calendar, User, ArrowRight, Share2, Clock, ChevronLeft, Layout } from 'lucide-react';
import Loading from '../components/common/Loading';
import { API_URL } from '../api/axiosInstance';


const SingleBlog = () => {
  const { id } = useParams(); // غيرناها لـ id عشان تتوافق مع الراوتر والباك اند
  const { data: post, isLoading, error } = useSingleBlog(id || "");

  // سكرول لأول الصفحة لما المقال يفتح
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (isLoading) return <Loading />;
  if (error || !post) return (
    <div className="py-40 text-center space-y-4">
       <Layout size={60} className="mx-auto text-gray-200" />
       <h2 className="text-2xl font-black text-primary">المقال غير موجود</h2>
       <Link to="/blog" className="text-secondary font-bold underline">العودة للمدونة</Link>
    </div>
  );

  return (
    <div className="font-cairo bg-[#FBFBFE] min-h-screen pb-20" dir="rtl">
      {/* 1. Header Section */}
      <header className="pt-32 pb-10 bg-white border-b border-gray-50">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-secondary font-bold mb-8 group">
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /> العودة للمدونة
          </Link>
          
          <div className="max-w-4xl">
            <span className="bg-secondary/10 text-secondary px-5 py-2 rounded-2xl font-black text-sm uppercase tracking-wide">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-primary mt-6 mb-8 leading-[1.2]">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                   <User size={24} />
                </div>
                <div>
                  <p className="text-primary font-black text-sm">إدارة مجمع النور</p>
                  <p className="text-xs font-bold text-gray-400">قسم المحتوى الطبي</p>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
              <div className="flex items-center gap-2 text-sm font-black text-primary">
                <Calendar size={18} className="text-secondary" />
                {new Date(post.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-primary">
                <Clock size={18} className="text-secondary" />
                {post.views} مشاهدة
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Content Layout */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <main className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-[50px] overflow-hidden shadow-sm border border-gray-100">
              {/* تصليح مسار الصورة هنا */}
              <div className="h-[400px] md:h-[550px] w-full">
                <img 
                  src={post.image?.startsWith('http') ? post.image : `${API_URL}${post.image}`} 
                  className="w-full h-full object-cover" 
                  alt={post.title} 
                />
              </div>
              
              <div className="p-8 md:p-16">
                {post.subTitle && (
                  <h3 className="text-2xl font-black text-secondary mb-8 leading-relaxed">
                    {post.subTitle}
                  </h3>
                )}

                <div 
                  className="prose prose-lg max-w-none text-gray-600 leading-[2.2] font-bold 
                  prose-headings:text-primary prose-headings:font-black prose-p:mb-8 
                  prose-img:rounded-[40px] prose-strong:text-primary prose-strong:font-black"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Social Share */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <h4 className="font-black text-primary text-xl">هل وجدت المعلومة مفيدة؟ شاركها الآن:</h4>
                  <div className="flex gap-4">
                     <button className="w-14 h-14 bg-[#1877F2] text-white rounded-[20px] flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg shadow-blue-200"><Share2 size={24} /></button>
                     <button className="w-14 h-14 bg-[#25D366] text-white rounded-[20px] flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg shadow-green-200"><Share2 size={24} /></button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Side Bar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="sticky top-32 space-y-8">
              {/* CTA Card */}
              <div className="bg-primary rounded-[45px] p-10 text-white relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <h3 className="text-2xl font-black mb-6">احصل على استشارة فورية</h3>
                <p className="text-white/70 font-bold mb-8 leading-relaxed">
                  لا تتردد في استشارة أطبائنا المتخصصين. نحن هنا من أجل صحتك وصحة عائلتك على مدار الساعة.
                </p>
                <Link to="/doctors" className="block text-center py-5 bg-secondary text-white rounded-[20px] font-black text-lg hover:bg-white hover:text-primary transition-all shadow-xl shadow-secondary/20">
                  احجز موعدك الآن
                </Link>
              </div>

              {/* Related Posts Placeholder */}
              <div className="bg-white rounded-[45px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-primary mb-8 border-r-4 border-secondary pr-4">مقالات قد تهمك</h3>
                <div className="space-y-8">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group flex gap-4 items-center cursor-pointer">
                      <div className="w-20 h-20 bg-gray-100 rounded-[20px] overflow-hidden shrink-0 border border-gray-50">
                        <img src={`https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&sig=${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div>
                        <h4 className="font-black text-primary text-sm group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                          نصائح غذائية هامة لمرضى السكري في فصل الشتاء
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold mt-2 flex items-center gap-1">
                          اقرأ المزيد <ChevronLeft size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default SingleBlog;