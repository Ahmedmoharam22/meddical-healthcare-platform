import Appointment from '../models/appointmentModel.js';

// @desc    Create new appointment
// @route   POST /api/appointments
export const createAppointment = async (req, res) => {
    const { 
        patientName, 
        patientEmail, 
        patientPhone, 
        doctor, 
        Specialty, 
        appointmentDate, 
        appointmentTime, 
        message 
    } = req.body;

    try {
        const appointment = await Appointment.create({
            patientName,
            patientEmail,
            patientPhone,
            doctor,
            Specialty,
            appointmentDate,
            appointmentTime,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully!',
            data: appointment
        });
    } catch (error) {
        console.log("Mongoose Validation Error:", error.errors);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all appointments with doctor info
export const getAppointments = async (req, res) => {
    try {
        // بنعمل populate عشان نجيب اسم الدكتور والتخصص مع الحجز
        const appointments = await Appointment.find({})
            .populate('doctor', 'name specialty')
            .sort({ appointmentDate: 1 }); 
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Appointment Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete/Cancel Appointment
export const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'تم إزالة الحجز من النظام' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};