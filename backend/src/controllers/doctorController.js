import Doctor from '../models/doctorModel.js';

// @desc    Get all doctors
// @route   GET /api/doctors
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).populate('specialty', 'name icon');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
export const getDoctorById = async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};