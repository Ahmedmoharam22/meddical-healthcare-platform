import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({
  bodyPart: { type: String, required: true }, // head, chest, stomach, etc.
  labelAr: { type: String, required: true },  // الرأس، الصدر
  commonConditions: [{
    symptom: String,
    recommendation: String,
    specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' } // ربط مع عيادات المركز
  }]
});

export default mongoose.model('Symptom', symptomSchema);