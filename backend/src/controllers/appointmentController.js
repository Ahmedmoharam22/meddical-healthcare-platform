import Appointment from '../models/appointmentModel.js';

// @desc    Create new appointment
// @route   POST /api/appointments
export const createAppointment = async (req, res) => {
    const { 
        patientName, 
        patientEmail, 
        patientPhone, 
        doctor, 
        service, 
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
            service,
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
        res.status(400).json({ message: error.message });
    }
};