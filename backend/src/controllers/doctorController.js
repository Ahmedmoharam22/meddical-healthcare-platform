import Doctor from '../models/doctorModel.js';
import Specialty from '../models/specialtyModel.js';



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



export const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { slug } = req.params;
    // أولاً: نلاقي الـ ID بتاع التخصص من الـ Slug
    const specialty = await Specialty.findOne({ slug: slug });
    if (!specialty) return res.status(404).json({ message: "التخصص غير موجود" });

    // ثانياً: نجيب الدكاترة اللي عندهم نفس الـ ID ده
    const doctors = await Doctor.find({ specialty: specialty._id }).populate('specialty');
    res.status(200).json(doctors);
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
        res.status(404).json({ message: 'الدكتور غير موجود' });
    }
};


// add doctor
// @desc    Add doctor
// @route   POST /api/doctors
export const addDoctor = async (req, res) => {
    try {
        const doctorData = { ...req.body };
        
        // لو فيه صورة مرفوعة، خد المسار بتاعها وحطه في الداتا
        if (req.file) {
            doctorData.image = req.file.filename;
        }

        const doctor = await Doctor.create(doctorData);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// update doctor
// @desc    Update doctor by ID
// @route   PUT /api/doctors/:id
export const updateDoctor = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete doctor
// @desc    Delete doctor by ID
// @route   DELETE /api/doctors/:id
export const deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'تم حذف الطبيب بنجاح' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};