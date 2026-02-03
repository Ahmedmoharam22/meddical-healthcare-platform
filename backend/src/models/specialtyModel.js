import mongoose from 'mongoose';

const specialtySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
}, { timestamps: true });

const Specialty = mongoose.model('Specialty', specialtySchema);
export default Specialty;