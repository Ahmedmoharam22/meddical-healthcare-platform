import mongoose from 'mongoose';

const specialtySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0 },    
}, { timestamps: true });

const Specialty = mongoose.model('Specialty', specialtySchema);
export default Specialty;