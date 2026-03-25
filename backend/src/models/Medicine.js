import mongoose from 'mongoose';
const MedicineSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'يرجى إدخال اسم الدواء'], 
    trim: true 
  },
  genericName: { type: String, trim: true }, // الاسم العلمي
  category: { 
    type: String, 
    required: [true, 'يرجى تحديد القسم'],
    enum: ['Antibiotics', 'Painkillers', 'Vitamins', 'Chronic', 'Others'] 
  },
  price: { 
    type: Number, 
    required: [true, 'يرجى إدخال سعر البيع'] 
  },
image: { 
    type: String, 
    default: 'https://via.placeholder.com/300x300?text=No+Image' // صورة افتراضية
  },
  
  // ممكن نضيف كمان "باركود" عشان لو حبيت تطور السيستم مستقبلاً بسكانر
  barcode: { type: String, unique: true, sparse: true },
  purchasePrice: { type: Number, required: true }, // سعر الشراء (لحساب الأرباح لاحقاً)
  stock: { 
    type: Number, 
    required: [true, 'يرجى إدخال الكمية المتاحة'], 
    min: [0, 'الكمية لا يمكن أن تكون أقل من صفر'] 
  },
  minThreshold: { 
    type: Number, 
    default: 10 // لو الكمية وصلت لـ 10، السيستم يدي تنبيه "نواقص"
  },
  expiryDate: { 
    type: Date, 
    required: [true, 'يرجى إدخال تاريخ الصلاحية'] 
  },
  supplier: { type: String },
  location: { type: String }, // مكانه في الصيدلية (مثلاً: الرف A-1)
}, { 
  timestamps: true // بيضيف createdAt و updatedAt أوتوماتيك
});

export default mongoose.model('Medicine', MedicineSchema);