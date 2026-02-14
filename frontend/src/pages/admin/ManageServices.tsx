// import React, { useState } from 'react';
// import { useServices } from '../../hooks/useServices';
// import { Plus, Trash2, Edit2, Loader2, LayoutGrid, X } from 'lucide-react';

// const ServicesManager = () => {
//     const { services, isLoading, createService, deleteService, isCreating } = useServices();
    
//     // حالات الـ Form والـ Modal
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         icon: 'Stethoscope', // افتراضي
//         slug: ''
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         createService(formData, {
//             onSuccess: () => {
//                 setIsModalOpen(false);
//                 setFormData({ name: '', description: '', icon: 'Stethoscope', slug: '' });
//             }
//         });
//     };

//     if (isLoading) return (
//         <div className="flex flex-col items-center justify-center h-64 space-y-4">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//             <p className="text-slate-500 font-medium">جاري تحميل الخدمات...</p>
//         </div>
//     );

//     return (
//         <div className="p-4 md:p-8 bg-slate-50 min-h-screen" dir="rtl">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//                 <div>
//                     <h1 className="text-2xl font-black text-slate-800">إدارة الخدمات الطبية</h1>
//                     <p className="text-slate-500 text-sm">أضف، عدل، أو احذف خدمات مجمع النور الطبي</p>
//                 </div>
//                 <button 
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200"
//                 >
//                     <Plus size={20} />
//                     إضافة خدمة جديدة
//                 </button>
//             </div>

//             {/* Services Table/List */}
//             <div className="bg-white rounded-[30px] border border-slate-200 overflow-hidden shadow-sm">
//                 <table className="w-full text-right border-collapse">
//                     <thead className="bg-slate-50 border-b border-slate-100">
//                         <tr>
//                             <th className="p-5 text-slate-600 font-bold">الخدمة</th>
//                             <th className="p-5 text-slate-600 font-bold hidden md:table-cell">الوصف</th>
//                             <th className="p-5 text-slate-600 font-bold">العمليات</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-50">
//                         {services?.map((service: any) => (
//                             <tr key={service._id} className="hover:bg-slate-50/50 transition-colors">
//                                 <td className="p-5">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center uppercase font-bold">
//                                             {service.name.charAt(0)}
//                                         </div>
//                                         <span className="font-bold text-slate-700">{service.name}</span>
//                                     </div>
//                                 </td>
//                                 <td className="p-5 hidden md:table-cell text-slate-500 text-sm max-w-md">
//                                     <p className="truncate">{service.description}</p>
//                                 </td>
//                                 <td className="p-5">
//                                     <div className="flex items-center gap-2">
//                                         <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
//                                             <Edit2 size={18} />
//                                         </button>
//                                         <button 
//                                             onClick={() => { if(window.confirm('هل أنت متأكد من الحذف؟')) deleteService(service._id) }}
//                                             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
//                                         >
//                                             <Trash2 size={18} />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {services?.length === 0 && (
//                     <div className="text-center py-20">
//                         <LayoutGrid className="mx-auto text-slate-200 mb-4" size={60} />
//                         <p className="text-slate-400 font-medium">لا توجد خدمات مضافة حالياً</p>
//                     </div>
//                 )}
//             </div>

//             {/* Modal - Tailwind Only */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//                     <div className="bg-white w-full max-w-lg rounded-[35px] shadow-2xl overflow-hidden">
//                         <div className="flex justify-between items-center p-6 border-b border-slate-100">
//                             <h3 className="text-xl font-black text-slate-800">بيانات الخدمة الجديدة</h3>
//                             <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
//                                 <X size={24} />
//                             </button>
//                         </div>
                        
//                         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//                             <div>
//                                 <label className="block text-sm font-bold text-slate-700 mb-2">اسم الخدمة</label>
//                                 <input 
//                                     name="name" required value={formData.name} onChange={handleInputChange}
//                                     className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
//                                     placeholder="مثال: عيادة الأسنان"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-slate-700 mb-2">الوصف المختصر</label>
//                                 <textarea 
//                                     name="description" required value={formData.description} onChange={handleInputChange}
//                                     className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none h-28"
//                                     placeholder="اكتب وصفاً جذاباً للخدمة..."
//                                 />
//                             </div>
//                             <div className="flex gap-3 pt-4">
//                                 <button 
//                                     type="submit" disabled={isCreating}
//                                     className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center justify-center"
//                                 >
//                                     {isCreating ? <Loader2 className="animate-spin" size={24} /> : 'حفظ ونشر الخدمة'}
//                                 </button>
//                                 <button 
//                                     type="button" onClick={() => setIsModalOpen(false)}
//                                     className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
//                                 >
//                                     إلغاء
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ServicesManager;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useServices } from '../../hooks/useServices';
import { Plus, Trash2, Edit2, Loader2, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, type ServiceFormData } from '../../schemas/serviceSchema';
import ConfirmModal from '../../components/shared/ConfirmModal';

const ServicesManager = () => {
    const { services, isLoading, createService, deleteService, updateService, isCreating, isUpdating } = useServices();
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema)
    });

    // --- Handlers ---
    const onSubmit = (data: ServiceFormData) => {
        if (isEditMode && selectedService) {
            updateService(
                { id: selectedService._id, updatedData: data },
                { onSuccess: () => { setIsFormModalOpen(false); reset(); } }
            );
        } else {
            createService(data, {
                onSuccess: () => { setIsFormModalOpen(false); reset(); }
            });
        }
    };

    const handleDelete = () => {
        if (selectedService) {
            deleteService(selectedService._id, {
                onSuccess: () => setIsDeleteModalOpen(false)
            });
        }
    };

    const openEditModal = (service: any) => {
        setIsEditMode(true);
        setSelectedService(service);
        reset({ name: service.name, description: service.description });
        setIsFormModalOpen(true);
    };

    if (isLoading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div className="p-8 font-cairo text-right" dir="rtl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-slate-800">إدارة الخدمات</h1>
                <button 
                    onClick={() => { setIsEditMode(false); reset(); setIsFormModalOpen(true); }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                    <Plus size={18} /> إضافة خدمة
                </button>
            </div>

            {/* Table UI */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-5 text-slate-600 font-bold">اسم الخدمة</th>
                            <th className="p-5 text-slate-600 font-bold text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((service: any) => (
                            <tr key={service._id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-all">
                                <td className="p-5 font-bold text-slate-700">{service.name}</td>
                                <td className="p-5 flex justify-center gap-2">
                                    <button onClick={() => openEditModal(service)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                                    <button 
                                        onClick={() => { setSelectedService(service); setIsDeleteModalOpen(true); }} 
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 1. Form Modal */}
            {isFormModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-[30px] p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black">{isEditMode ? 'تعديل الخدمة' : 'خدمة جديدة'}</h3>
                            <button onClick={() => setIsFormModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">الاسم</label>
                                <input {...register('name')} className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">الوصف</label>
                                <textarea {...register('description')} className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-28" />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>
                            <button disabled={isCreating || isUpdating} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black">
                                {isCreating || isUpdating ? <Loader2 className="animate-spin mx-auto" /> : 'حفظ'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* 2. Your Ready Confirm Modal */}
            <ConfirmModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={handleDelete}
                title="حذف الخدمة"
                message={`هل أنت متأكد من حذف خدمة ${selectedService?.name}؟`}
                isLoading={false} // لو الكومبوننت بتاعك بيدعم الـ Loading
            />
        </div>
    );
};

export default ServicesManager;