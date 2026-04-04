import React, { useState, useEffect } from 'react';
import { useDoctors } from '../../hooks/useDoctors';
import { useSpecialties } from '../../hooks/useSpecialties';
import { useForm } from 'react-hook-form';
import { Trash2, Edit, UserPlus, Loader2, X, Stethoscope, Plus } from 'lucide-react';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { API_URL } from '../../api/axiosInstance';


const ManageDoctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: doctors, isLoading, addDoctor, isAdding, updateDoctor, isUpdating, deleteDoctor, isDeleting } = useDoctors();
  const { data: specialties } = useSpecialties();
  const { register, handleSubmit, reset, setValue } = useForm();

  // --- Logic ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
    setPreviewImage(null);
    reset();
  };

  const onEdit = (doc: any) => {
    setEditingDoctor(doc);
    setPreviewImage(doc.image ? `${API_URL}${doc.image}` : null);
    // ملئ الفورم يدوي لضمان الدقة
    reset({
      name: doc.name,
      title: doc.title,
      specialty: doc.specialty?._id,
      bio: doc.bio,
      isFeatured: doc.isFeatured
    });
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

    if (editingDoctor) {
      updateDoctor({ id: editingDoctor._id, data: formData }, { onSuccess: handleCloseModal });
    } else {
      addDoctor(formData, { onSuccess: handleCloseModal });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-secondary" size={48} />
      <p className="text-primary font-black animate-pulse">جاري تحميل البيانات...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary">إدارة الأطباء</h1>
          <p className="text-gray-400 font-bold">تحكم في طاقم مجمع النور الطبي</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-primary transition-all shadow-xl shadow-secondary/20 cursor-pointer">
          <UserPlus size={22}/> إضافة دكتور جديد
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-right min-w-[600px]">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-primary font-black">الطبيب</th>
              <th className="p-6 text-primary font-black">التخصص</th>
              <th className="p-6 text-primary font-black text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {doctors?.map((doc: any) => (
              <tr key={doc._id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-secondary">
                    {doc.image ? <img src={`http://localhost:5000/uploads/${doc.image}`} className="w-full h-full object-cover" /> : <Stethoscope size={24}/>}
                  </div>
                  <div>
                    <p className="font-black text-primary text-lg leading-tight">{doc.name}</p>
                    <p className="text-gray-400 text-xs font-bold mt-1 tracking-tighter">{doc.title}</p>
                  </div>
                </td>
                <td className="p-6">
                  <span className="px-4 py-2 bg-gray-100 rounded-xl text-primary font-bold text-sm">{doc.specialty?.name || 'عام'}</span>
                </td>
                <td className="p-6 flex justify-center gap-3">
                  <button onClick={() => onEdit(doc)} className="p-3 text-blue-500 hover:bg-blue-100 rounded-2xl cursor-pointer transition-all"><Edit size={20}/></button>
                  <button onClick={() => setDeleteId(doc._id)} className="p-3 text-red-500 hover:bg-red-100 rounded-2xl cursor-pointer transition-all"><Trash2 size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden border border-white/20 animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-primary">{editingDoctor ? 'تعديل بيانات الطبيب' : 'إضافة طبيب جديد'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={28}/></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="text-sm font-black text-primary mr-2">الاسم الكامل</label>
                <input {...register('name')} required className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary outline-none font-bold" placeholder="د. محمد علي" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-primary mr-2">التخصص</label>
                  <select {...register('specialty')} required className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary outline-none font-bold cursor-pointer appearance-none">
                    <option value="">اختر...</option>
                    {specialties?.map((spec: any) => <option key={spec._id} value={spec._id}>{spec.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-primary mr-2">المسمى الوظيفي</label>
                  <input {...register('title')} required className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary outline-none font-bold" placeholder="Senior Surgeon" />
                </div>
              </div>

              {/* Image Input */}
              <div className="space-y-2">
                <label className="text-sm font-black text-primary mr-2">صورة الطبيب</label>
                <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-[25px] p-4 hover:bg-secondary/5 hover:border-secondary transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 flex items-center justify-center">
                      {previewImage ? <img src={`http://localhost:5000${previewImage}`} className="w-full h-full object-cover" /> : <Plus className="text-gray-300" size={28} />}
                    </div>
                    <div>
                        <p className="text-primary font-black text-sm">{previewImage ? 'تغيير الصورة' : 'ارفع صورة'}</p>
                        <p className="text-gray-400 text-xs font-bold">PNG, JPG (Max 5MB)</p>
                    </div>
                  </div>
                  <input type="file" {...register('image')} onChange={(e) => { register('image').onChange(e); handleImageChange(e); }} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-primary mr-2">نبذة طبية</label>
                <textarea {...register('bio')} required rows={3} className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-secondary outline-none font-bold resize-none" placeholder="نبذة قصيرة..." />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <input type="checkbox" {...register('isFeatured')} className="w-5 h-5 cursor-pointer accent-secondary" id="featured" />
                <label htmlFor="featured" className="text-sm font-black text-primary cursor-pointer">عرض في الصفحة الرئيسية</label>
              </div>

              <button disabled={isAdding || isUpdating} type="submit" className="w-full py-5 bg-secondary text-white rounded-[20px] font-black text-lg hover:bg-primary transition-all flex items-center justify-center gap-3 cursor-pointer">
                {(isAdding || isUpdating) ? <Loader2 className="animate-spin" /> : editingDoctor ? 'تحديث البيانات' : 'حفظ البيانات'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { deleteDoctor(deleteId!); setDeleteId(null); }}
        title="حذف الطبيب"
        message="هل أنت متأكد؟ سيتم مسح بيانات الطبيب وصورته نهائياً."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManageDoctors;