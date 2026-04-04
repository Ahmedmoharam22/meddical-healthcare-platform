// import mongoose from 'mongoose';

// const doctorSchema = mongoose.Schema({
//     name: { 
//         type: String, 
//         required: [true, 'Please add the doctor name'] 
//     },
//     title: { 
//         type: String, 
//         required: [true, 'Please add a title (e.g., Senior Surgeon)'] 
//     },
//     specialty: { 
//      type: mongoose.Schema.Types.ObjectId,
//      ref: 'Specialty',
//     required: true
//     },
//     bio: { 
//         type: String, 
//         required: [true, 'Please add a short biography'] 
//     },
//     image: { 
//         type: String, 
//         default: 'default-doctor.jpg' // للشباب عشان لو مرفعوش صورة ميبقاش الكارت فاضي
//     },
//     // السوشيال ميديا عشان الأيكونز اللي تحت صورة الدكتور في الفيجما
//     socialLinks: {
//         linkedin: { type: String, default: '#' },
//         facebook: { type: String, default: '#' },
//         instagram: { type: String, default: '#' }
//     },
//     // حقل عشان نظهر الدكتور في الـ Home Page (Featured)
//     isFeatured: { 
//         type: Boolean, 
//         default: false 
//     }
// }, {
//     timestamps: true // بيضيف createdAt و updatedAt أوتوماتيك
// });

// const Doctor = mongoose.model('Doctor', doctorSchema);
// export default Doctor;













import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'يرجى إضافة اسم الدكتور'],
        trim: true 
    },
    // الـ Slug للروابط (مثال: dr-ahmed-ali)
    slug: { 
        type: String, 
        unique: true,
        lowercase: true
    },
    title: { 
        type: String, 
        required: [true, 'يرجى إضافة اللقب الوظيفي (مثال: أخصائي أول)'] 
    },
    specialty: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: [true, 'التخصص مطلوب']
    },
    bio: { 
        type: String, 
        required: [true, 'يرجى إضافة نبذة تعريفية'] 
    },
    image: { 
        type: String, 
        default: 'default-doctor.jpg'
    },
    // إضافة النوع عشان التحكم في التصميم أو الأيكونز
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    socialLinks: {
        linkedin: { type: String, default: '#' },
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' }
    },
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    // هل الدكتور متاح حالياً لاستقبال حالات؟
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    // مهم جداً عشان الـ Virtuals تظهر لما تبعت JSON للفرونت إند
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// --- شغل السينيورز (Virtual Populate) ---
// بنعمل "علاقة وهمية" مع موديل الجدول عشان نجيب المواعيد من غير ما نخزنها هنا
doctorSchema.virtual('schedules', {
    ref: 'Schedule',           // اسم موديل المواعيد
    localField: '_id',         // الحقل هنا (ID الدكتور)
    foreignField: 'doctor'     // الحقل في موديل المواعيد اللي رابط بالدكتور
});

// Middleware لعمل الـ Slug تلقائياً قبل الحفظ (لو مش هتعمله من الفرونت)
doctorSchema.pre('save', function(next) {
    if (!this.isModified('name')) return next();
    // تحويل الاسم لـ slug بسيط (دي نسخة مبدئية)
    this.slug = this.name.split(' ').join('-').toLowerCase();
    next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;

