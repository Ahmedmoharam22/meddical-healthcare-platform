import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  day: { 
    type: String, 
    required: true,
    enum: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
  },
  startTime: { type: String, required: true }, // مثال: "4 م"
  endTime: { type: String, required: true },   // مثال: "7 م"
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);