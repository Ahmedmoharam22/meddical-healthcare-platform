import express from 'express';
const router = express.Router();
import { createAppointment, getAppointments, updateStatus, deleteAppointment } from '../controllers/appointmentController.js';

router.post('/', createAppointment);
router.get('/', getAppointments);
router.delete('/:id', deleteAppointment);
router.put('/:id/status', updateStatus);

export default router;