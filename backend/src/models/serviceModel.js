import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a service name'] 
    },
    description: { 
        type: String, 
        required: [true, 'Please add a description'] 
    },
    image: { 
        type: String, 
        required: [true, 'Please add a service image URL'] 
    },
    // الـ icon ممكن نسيبه لو محتاجينه في مكان تاني زي الـ Navbar أو Footer
    icon: { 
        type: String 
    },
    slug: {
        type: String
    } // ده عشان الـ "Learn More" يروح لـ URL شيك زي /services/cardiology
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;