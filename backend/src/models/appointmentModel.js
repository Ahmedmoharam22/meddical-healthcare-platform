import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    
    // ربط الحجز بدكتور معين
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    
    // ربط الحجز بخدمة/قسم معين
    Specialty: {
type: mongoose.Schema.Types.ObjectId,
       required: true,
        ref: 'Specialty'
    },
    
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true }, // مثلاً "10:30 AM"
    
    message: { type: String },
    
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;