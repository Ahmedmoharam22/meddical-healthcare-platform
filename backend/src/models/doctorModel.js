import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add the doctor name'] 
    },
    title: { 
        type: String, 
        required: [true, 'Please add a title (e.g., Senior Surgeon)'] 
    },
    specialty: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Specialty',
    required: true
    },
    bio: { 
        type: String, 
        required: [true, 'Please add a short biography'] 
    },
    image: { 
        type: String, 
        default: 'default-doctor.jpg' // للشباب عشان لو مرفعوش صورة ميبقاش الكارت فاضي
    },
    // السوشيال ميديا عشان الأيكونز اللي تحت صورة الدكتور في الفيجما
    socialLinks: {
        linkedin: { type: String, default: '#' },
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' }
    },
    // حقل عشان نظهر الدكتور في الـ Home Page (Featured)
    isFeatured: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true // بيضيف createdAt و updatedAt أوتوماتيك
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;