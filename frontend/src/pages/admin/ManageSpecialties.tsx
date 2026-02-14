import React, { useState } from 'react';
import { useSpecialties } from '../../hooks/useSpecialties';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, LayoutGrid, Loader2, X, Microscope } from 'lucide-react';
import ConfirmModal from '../../components/shared/ConfirmModal';

const ManageSpecialties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: specialties, isLoading, addSpecialty, deleteSpecialty } = useSpecialties();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    addSpecialty.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      }
    });
  };

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20" size={48} />;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
          <LayoutGrid className="text-secondary" /> إدارة التخصصات
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer">
          <Plus size={20}/> إضافة تخصص
        </button>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {specialties?.map((spec: any) => (
          <div key={spec._id} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
            <button 
              onClick={() => setDeleteId(spec._id)}
              className="absolute top-4 left-4 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
            <div className="text-4xl mb-4">{spec.icon || '🩺'}</div>
            <h3 className="text-xl font-black text-primary mb-2">{spec.name}</h3>
            <p className="text-gray-400 text-sm font-bold line-clamp-2">{spec.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs font-black text-secondary">
              <span>{spec.slug}</span>
              <span className="bg-secondary/10 px-2 py-1 rounded-lg">ID: {spec._id.slice(-4)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-md rounded-[35px] relative z-10 p-8 space-y-5 animate-in zoom-in duration-200 shadow-2xl">
            <h2 className="text-2xl font-black text-primary">تخصص جديد</h2>
            
            <div>
              <label className="block text-sm font-black mb-2 mr-2">اسم التخصص</label>
              <input {...register('name')} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-secondary/20 font-bold" placeholder="مثلاً: العظام" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black mb-2 mr-2">أيقونة (Emoji)</label>
                <input {...register('icon')} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="🦴" />
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-[10px] text-gray-400 font-bold mb-2">انسخ ايموجي من الكيبورد</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-black mb-2 mr-2">وصف قصير</label>
              <textarea {...register('description')} rows={3} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold resize-none" placeholder="شرح مبسط عن القسم..." />
            </div>

            <button type="submit" disabled={addSpecialty.isPending} className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-primary transition-all cursor-pointer">
              {addSpecialty.isPending ? <Loader2 className="animate-spin mx-auto" /> : 'إنشاء التخصص'}
            </button>
          </form>
        </div>
      )}

      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { deleteSpecialty.mutate(deleteId!); setDeleteId(null); }}
        title="حذف التخصص"
        message="حذفك للتخصص قد يؤثر على عرض الدكاترة التابعين له. هل أنت متأكد؟"
      />
    </div>
  );
};

export default ManageSpecialties;