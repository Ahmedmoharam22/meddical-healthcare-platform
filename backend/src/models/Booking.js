import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  appointmentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['online', 'on_site'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  stripeSessionId: { type: String }, // عشان نتابع العملية في سترايب
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;