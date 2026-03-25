  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { Phone, User, Mail, Clock, MessageSquare, ChevronDown } from 'lucide-react';
  import { appointmentSchema, type AppointmentInput } from '../../utils/validations';
  import { useCreateAppointment } from '../../hooks/useAppointments';
  import { useDoctors } from '../../hooks/useDoctors';
  import Loading from '../common/Loading';
  import { useSpecialties } from '../../hooks/useSpecialties';
  import SectionHeader from '../common/SectionHeader';

  const Appointment = () => {
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
      mode: "onTouched", // عشان يظهر الأخطاء أول ما يلمس الحقل
    });

    const onSubmit = (data: AppointmentInput) => {
      console.log("Submitting Data:", data);
      mutate(data, {
        onSuccess: () => reset(),
      });
    };

    if (loadingDocs || loadingSpecs) return <Loading />;

    return (
      <section id="appointment" className="py-24 bg-white font-cairo">
        <SectionHeader
          title="احجز موعدك الآن"
          subtitle="املأ كافة البيانات المطلوبة لضمان تسجيل موعدك في مجمع النور الطبي بدقة."
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row bg-primary rounded-[40px] overflow-hidden shadow-2xl">
            
            {/* الجانب الأيمن: محتوى ثابت */}
            <div className="lg:w-2/5 p-12 lg:p-16 text-white bg-primary flex flex-col justify-center">
              <h2 className="text-display-2 font-bold mb-6">احجز موعدك الآن</h2>
              <p className="text-body-2 text-accent/80 mb-10 leading-relaxed">
                املأ كافة البيانات المطلوبة لضمان تسجيل موعدك في مجمع النور الطبي بدقة.
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-small text-accent font-bold">للطوارئ</p>
                  <p className="text-xl font-bold">0123-456-789</p>
                </div>
              </div>
            </div>

            {/* الجانب الأيسر: الفورم الكاملة */}
            <div className="lg:w-3/5 bg-[#F8FAFC] p-12 lg:p-16">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. الاسم بالكامل */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <User className="absolute right-4 top-4 text-gray-400" size={20} />
                    <input 
                      {...register('patientName')}
                      placeholder="الاسم بالكامل" 
                      className={`w-full bg-white border ${errors.patientName ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary`}
                    />
                  </div>
                  {errors.patientName && <span className="text-red-500 text-xs mr-2">{errors.patientName.message}</span>}
                </div>

                {/* 2. البريد الإلكتروني (كان ناقص) */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <Mail className="absolute right-4 top-4 text-gray-400" size={20} />
                    <input 
                      {...register('patientEmail')}
                      placeholder="البريد الإلكتروني" 
                      className={`w-full bg-white border ${errors.patientEmail ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary`}
                    />
                  </div>
                  {errors.patientEmail && <span className="text-red-500 text-xs mr-2">{errors.patientEmail.message}</span>}
                </div>

                {/* 3. رقم الهاتف */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <Phone className="absolute right-4 top-4 text-gray-400" size={20} />
                    <input 
                      {...register('patientPhone')}
                      placeholder="رقم الهاتف (01...)" 
                      className={`w-full bg-white border ${errors.patientPhone ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary`}
                    />
                  </div>
                  {errors.patientPhone && <span className="text-red-500 text-xs mr-2">{errors.patientPhone.message}</span>}
                </div>

                {/* 4. القسم/التخصص */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <ChevronDown className="absolute left-4 top-4 text-gray-400" size={20} />
                    <select 
                      {...register('Specialty')}
                      className={`w-full bg-white border ${errors.Specialty ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary`}
                    >
                      <option value="">اختر القسم</option>
                      {specialties?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>
                  {errors.Specialty && <span className="text-red-500 text-xs mr-2">{errors.Specialty.message}</span>}
                </div>

                {/* 5. الطبيب */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <ChevronDown className="absolute left-4 top-4 text-gray-400" size={20} />
                    <select 
                      {...register('doctor')}
                      className={`w-full bg-white border ${errors.doctor ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary`}
                    >
                      <option value="">اختر الطبيب</option>
                      {doctors?.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                    </select>
                  </div>
                  {errors.doctor && <span className="text-red-500 text-xs mr-2">{errors.doctor.message}</span>}
                </div>

                {/* 6. التاريخ */}
                <div className="flex flex-col gap-1">
                  <div className="relative group">
                    <input 
                      type="date"
                      {...register('appointmentDate')}
                      className={`w-full bg-white border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary`}
                    />
                  </div>
                  {errors.appointmentDate && <span className="text-red-500 text-xs mr-2">{errors.appointmentDate.message}</span>}
                </div>

                {/* 7. الوقت */}
                <div className="flex flex-col gap-1 md:col-span-1">
                  <div className="relative group">
                    <Clock className="absolute right-4 top-4 text-gray-400" size={20} />
                    <select 
                      {...register('appointmentTime')}
                      className={`w-full bg-white border ${errors.appointmentTime ? 'border-red-500' : 'border-gray-100'} p-4 pr-12 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-secondary`}
                    >
                      <option value="">اختر الوقت</option>
                      <option value="09:00 AM">09:00 صباحاً</option>
                      <option value="12:00 PM">12:00 ظهراً</option>
                      <option value="04:00 PM">04:00 مساءً</option>
                    </select>
                  </div>
                  {errors.appointmentTime && <span className="text-red-500 text-xs mr-2">{errors.appointmentTime.message}</span>}
                </div>

                {/* 8. الرسالة */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <div className="relative group">
                    <MessageSquare className="absolute right-4 top-4 text-gray-400" size={20} />
                    <textarea 
                      {...register('message')}
                      placeholder="ملاحظات إضافية"
                      rows={3}
                      className="w-full bg-white border border-gray-100 p-4 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isPending}
                  className="md:col-span-2 bg-secondary text-white font-bold py-5 rounded-2xl hover:bg-primary transition-all shadow-lg disabled:bg-gray-400 flex justify-center items-center"
                >
                  {isPending ? 'جاري الحجز...' : 'تأكيد الحجز الآن'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Appointment;