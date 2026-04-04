import { useForm } from 'react-hook-form';
import { useServices } from '../../hooks/useServices';
import { Plus, Trash2, Edit2, Loader2, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, type ServiceFormData } from '../../schemas/serviceSchema';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { useState } from 'react';

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
                    className="bg-secondary text-white cursor-pointer px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                    <Plus size={18} /> إضافة خدمة
                </button>
            </div>

            {/* Table UI */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full min-w-[500px]">
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
                                    <button onClick={() => openEditModal(service)} className="p-2 cursor-pointer text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                                    <button 
                                        onClick={() => { setSelectedService(service); setIsDeleteModalOpen(true); }} 
                                        className="p-2 cursor-pointer text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2  size={18} />
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
                            <button  disabled={isCreating || isUpdating} className="w-full bg-blue-600 cursor-pointer text-white py-4 rounded-xl font-black">
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
                isLoading={false}    
            />
        </div>
    );
};

export default ServicesManager;