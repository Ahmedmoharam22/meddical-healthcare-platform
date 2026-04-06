import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, User, Mail, Clock, MessageSquare, ChevronDown, Calendar } from 'lucide-react';
import { appointmentSchema, type AppointmentInput } from '../../utils/validations';
import { useCreateAppointment } from '../../hooks/useAppointments';
import { useDoctors } from '../../hooks/useDoctors';
import { useSpecialties } from '../../hooks/useSpecialties';
import Loading from '../common/Loading';
import toast from 'react-hot-toast'; 

const AppointmentForm = () => {
  const { data: doctors, isLoading: loadingDocs } = useDoctors();
  const { data: specialties, isLoading: loadingSpecs } = useSpecialties();
  const { mutate, isPending } = useCreateAppointment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: AppointmentInput) => {
    mutate(data, {
      onSuccess: () => {
                reset();
      },
      onError: () => toast.error('حدث خطأ أثناء الحجز، حاول مرة أخرى.')
    });
  };

  if (loadingDocs || loadingSpecs) return <div className="h-64 flex items-center justify-center"><Loading /></div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. الاسم بالكامل */}
      <FormField error={errors.patientName}>
        <User className="absolute right-4 top-4 text-gray-400" size={20} />
        <input 
          {...register('patientName')}
          placeholder="الاسم بالكامل" 
          className={`w-full bg-white border ${errors.patientName ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        />
      </FormField>

      {/* 2. البريد الإلكتروني */}
      <FormField error={errors.patientEmail}>
        <Mail className="absolute right-4 top-4 text-gray-400" size={20} />
        <input 
          {...register('patientEmail')}
          placeholder="البريد الإلكتروني" 
          className={`w-full bg-white border ${errors.patientEmail ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        />
      </FormField>

      {/* 3. رقم الهاتف */}
      <FormField error={errors.patientPhone}>
        <Phone className="absolute right-4 top-4 text-gray-400" size={20} />
        <input 
          {...register('patientPhone')}
          placeholder="رقم الهاتف (01...)" 
          className={`w-full bg-white border ${errors.patientPhone ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        />
      </FormField>

      {/* 4. التخصص */}
      <FormField error={errors.Specialty}>
        <ChevronDown className="absolute left-4 top-4 text-gray-400 pointer-events-none" size={20} />
        <select 
          {...register('Specialty')}
          className={`w-full bg-white border ${errors.Specialty ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        >
          <option value="">اختر القسم</option>
          {specialties?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </FormField>

      {/* 5. الطبيب */}
      <FormField error={errors.doctor}>
        <ChevronDown className="absolute left-4 top-4 text-gray-400 pointer-events-none" size={20} />
        <select 
          {...register('doctor')}
          className={`w-full bg-white border ${errors.doctor ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        >
          <option value="">اختر الطبيب</option>
          {doctors?.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
      </FormField>

      {/* 6. التاريخ */}
      <FormField error={errors.appointmentDate}>
        <Calendar className="absolute right-4 top-4 text-gray-400" size={20} />
        <input 
          type="date"
          {...register('appointmentDate')}
          className={`w-full bg-white border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        />
      </FormField>

      {/* 7. الوقت */}
      <FormField error={errors.appointmentTime}>
        <Clock className="absolute right-4 top-4 text-gray-400" size={20} />
        <select 
          {...register('appointmentTime')}
          className={`w-full bg-white border ${errors.appointmentTime ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all`}
        >
          <option value="">اختر الوقت</option>
          <option value="09:00 AM">09:00 صباحاً</option>
          <option value="12:00 PM">12:00 ظهراً</option>
          <option value="04:00 PM">04:00 مساءً</option>
        </select>
      </FormField>

      {/* 8. الرسالة */}
      <div className="flex flex-col gap-1 md:col-span-2 relative group">
        <MessageSquare className="absolute right-4 top-4 text-gray-400" size={20} />
        <textarea 
          {...register('message')}
          placeholder="ملاحظات إضافية"
          rows={3}
          className="w-full bg-white border border-gray-100 p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary text-primary font-bold transition-all"
        />
      </div>

      <button 
        type="submit"
        disabled={isPending}
        className="md:col-span-2 cursor-pointer bg-secondary text-primary font-black py-5 rounded-2xl hover:bg-white border-2 border-transparent hover:border-secondary transition-all shadow-xl disabled:bg-gray-400 flex justify-center items-center gap-2"
      >
        {isPending ? 'جاري الحجز...' : 'تأكيد الحجز الآن'}
      </button>
    </form>
  );
};

// كومبوننت فرعي للحقول لتقليل التكرار
const FormField = ({ children, error }: any) => (
  <div className="flex flex-col gap-1 relative">
    {children}
    {error && <span className="text-red-500 text-[10px] font-bold mr-2 mt-1">{error.message}</span>}
  </div>
);

export default AppointmentForm;