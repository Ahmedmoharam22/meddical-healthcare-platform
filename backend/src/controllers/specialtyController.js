import Specialty from '../models/specialtyModel.js';
import slugify from 'slugify'; 
// @desc    Get all specialties
// @route   GET /api/specialties
export const getSpecialties = async (req, res) => {
    const specialties = await Specialty.find({});
    res.json(specialties);
};
// @desc    Create a specialty (Admin only later)
// @route   POST /api/specialties
export const createSpecialty = async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        
        // توليد السلوج أوتوماتيك من الاسم
        const slug = slugify(name, { lower: true, strict: true, locale: 'ar' });

        const specialty = await Specialty.create({ 
            name, 
            description, 
            icon, 
            slug 
        });
        
        res.status(201).json(specialty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// @desc    Delete a specialty (Admin only later)
// @route   DELETE /api/specialties/:id
export const deleteSpecialty = async (req, res) => {
    await Specialty.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف التخصص' });
};