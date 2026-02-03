import Specialty from '../models/specialtyModel.js';

// @desc    Get all specialties
// @route   GET /api/specialties
export const getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find({});
        res.json(specialties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a specialty (Admin only later)
// @route   POST /api/specialties
export const createSpecialty = async (req, res) => {
    try {
        const { name, description, icon, image } = req.body;
        const specialty = await Specialty.create({ name, description, icon, image });
        res.status(201).json(specialty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};