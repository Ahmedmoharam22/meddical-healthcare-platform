import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, Calendar, CreditCard, Banknote, Loader2, ChevronLeft } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { bookingSchema, type BookingFormData } from "../utils/bookingSchema";
import InputField from "./forms/InputField";
import PaymentCard from "./common/PaymentCard";
import type { Props } from "../types";

// Load Stripe outside of component lifecycle
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const BookingFormContent = ({ doctorId, specialtyId, specialtyName, price }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { mutate, isPending } = useCreateBooking(stripe, elements);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { paymentMethod: "on_site" }
  });

  const selectedPayment = watch("paymentMethod");

  const onSubmit = (data: BookingFormData) => {
    mutate({ ...data, doctorId, specialtyId });
  };

  return (
    <div className="max-w-4xl mx-auto font-cairo">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[45px] shadow-2xl p-8 md:p-12 border border-gray-50">
        
        {/* ملخص السعر */}
        <div className="flex justify-between items-center bg-site-bg p-8 rounded-[32px] mb-10">
          <div>
            <p className="text-gray-500 font-bold mb-1">قيمة كشف {specialtyName}</p>
            <h3 className="text-4xl font-black text-secondary">{price} <span className="text-lg">ج.م</span></h3>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
            <Calendar size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <InputField label="اسم المريض" icon={User} placeholder="الاسم ثلاثي" error={errors.patientName} {...register("patientName")} />
          <InputField label="رقم الموبايل" icon={Phone} placeholder="01xxxxxxxxx" error={errors.patientPhone} {...register("patientPhone")} />
          <div className="md:col-span-2">
             <InputField label="تاريخ الحجز" type="date" icon={Calendar} error={errors.appointmentDate} {...register("appointmentDate")} />
          </div>
        </div>

        <div className="mb-10">
          <h4 className="font-black text-xl text-primary mb-6">اختر طريقة الدفع</h4>
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <PaymentCard 
              value="on_site" 
              selected={selectedPayment} 
              register={register} 
              title="الدفع في العيادة" 
              description="احجز الآن وادفع عند الوصول للمجمع"
              icon={Banknote} 
            />
            <PaymentCard 
              value="online" 
              selected={selectedPayment} 
              register={register} 
              title="دفع أونلاين" 
              description="بواسطة الكارت أو المحفظة الإلكترونية"
              icon={CreditCard} 
            />
          </div>

          {selectedPayment === "online" && (
            <div className="p-6 border border-gray-200 rounded-3xl bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-4">بيانات البطاقة</label>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <CardElement options={{
                  style: { base: { fontSize: '16px', fontFamily: "Cairo, sans-serif" } }
                }} />
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit"
          disabled={isPending || (selectedPayment === "online" && !stripe)}
          className="w-full py-6 bg-primary text-white rounded-[28px] font-black text-2xl hover:bg-secondary transition-all flex items-center justify-center gap-4 shadow-xl shadow-primary/20 disabled:opacity-70 cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={30} />
          ) : (
            <>
              {selectedPayment === "online" ? "تأكيد الحجز والدفع" : "تأكيد الحجز النهائي"}
              <ChevronLeft size={28} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const BookingForm = (props: Props) => {
  return (
    <Elements stripe={stripePromise}>
      <BookingFormContent {...props} />
    </Elements>
  );
};

export default BookingForm;