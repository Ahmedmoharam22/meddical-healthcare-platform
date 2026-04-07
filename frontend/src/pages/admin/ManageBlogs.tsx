import React, { useState } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Edit, FileText, Loader2, X, Eye, Image as ImageIcon } from 'lucide-react';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { API_URL } from '../../api/axiosInstance';
import AdminLoader from '../../components/dashboard/AdminLoader';


const ManageBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: blogs, isLoading, addBlog, isAdding, updateBlog, isUpdating, deleteBlog: removeBlog, isDeleting } = useBlogs();
  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setPreviewImage(null);
    reset();
  };

  const onEdit = (blog: any) => {
    setEditingBlog(blog);
    setPreviewImage(blog.image ? `${API_URL}${blog.image}` : null);
    reset(blog);
    setIsModalOpen(true);
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image') {
        if (data.image[0] instanceof File) formData.append('image', data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    if (editingBlog) {
      updateBlog({ id: editingBlog._id, data: formData }, { onSuccess: handleClose });
    } else {
      addBlog(formData, { onSuccess: handleClose });
    }
  };

  if (isLoading) return <AdminLoader label="جاري تحميل المدونة..." />;

  return (
    <div className="p-6 space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
        <div>
          <h1 className="text-3xl font-black text-primary flex items-center gap-3">
            <FileText className="text-secondary" /> مدونة مجمع النور
          </h1>
          <p className="text-gray-400 font-bold mt-1">شارك آخر النصائح الطبية والأخبار مع مرضاك</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-secondary/20 cursor-pointer">
          <Plus size={24}/> كتابة مقال جديد
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog: any) => (
          <div key={blog._id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
            {/* Image Section */}
            <div className="h-56 relative overflow-hidden">
              <img src={`http://localhost:5000/uploads/${blog.image}`} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-secondary font-black text-xs shadow-sm">
                {blog.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                <Eye size={14} /> <span>{blog.views} مشاهدة</span>
                <span className="mx-1">•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString('ar-EG')}</span>
              </div>
              <h3 className="text-xl font-black text-primary line-clamp-1">{blog.title}</h3>
              <p className="text-gray-500 font-bold text-sm line-clamp-2 leading-relaxed">{blog.subTitle || blog.content}</p>
              
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button onClick={() => onEdit(blog)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl font-black hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <Edit size={18} /> تعديل
                </button>
                <button onClick={() => setDeleteId(blog._id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة وتعديل المقال */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={handleClose}></div>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-2xl rounded-[40px] relative z-10 p-8 space-y-6 animate-in zoom-in duration-300 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black text-primary">{editingBlog ? 'تحديث المقال' : 'مقال طبي جديد'}</h2>
              <button type="button" onClick={handleClose} className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={28}/></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black mb-2 text-primary">العنوان الرئيسي</label>
                <input {...register('title')} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-secondary font-bold" placeholder="مثلاً: أهمية الفحص الدوري للقلب" />
              </div>

              <div>
                <label className="block text-sm font-black mb-2 text-primary">عنوان فرعي (اختياري)</label>
                <input {...register('subTitle')} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="وصف قصير يظهر تحت العنوان" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black mb-2 text-primary">القسم (Category)</label>
                  <select {...register('category')} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold cursor-pointer">
                    <option value="Medical">طب عام</option>
                    <option value="Health">نصائح صحية</option>
                    <option value="Surgery">جراحة</option>
                    <option value="News">أخبار المجمع</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black mb-2 text-primary">صورة الغلاف</label>
                  <div className="relative h-[56px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center group hover:border-secondary transition-all">
                    {previewImage ? <img src={`http://localhost:5000${previewImage}`} alt="Preview" loading="lazy" className="h-full w-full object-cover rounded-2xl" /> : <ImageIcon className="text-gray-300" />}
                    <input type="file" {...register('image')} onChange={(e) => { register('image').onChange(e); setPreviewImage(URL.createObjectURL(e.target.files![0])) }} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black mb-2 text-primary">محتوى المقال</label>
                <textarea {...register('content')} required rows={6} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold resize-none" placeholder="اكتب تفاصيل المقال هنا..." />
              </div>
            </div>

            <button type="submit" disabled={isAdding || isUpdating} className="w-full py-5 bg-secondary text-white rounded-[20px] font-black text-lg hover:bg-primary transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-secondary/20">
              {(isAdding || isUpdating) ? <Loader2 className="animate-spin" /> : editingBlog ? 'تحديث ونشر' : 'نشر المقال الآن'}
            </button>
          </form>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { removeBlog(deleteId!); setDeleteId(null); }}
        title="حذف المقال"
        message="هل أنت متأكد من حذف هذا المقال؟ سيتم إزالته من الموقع نهائياً."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManageBlogs;