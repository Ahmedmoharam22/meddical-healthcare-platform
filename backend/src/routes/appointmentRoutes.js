import express from 'express';
const router = express.Router();
import { createAppointment } from '../controllers/appointmentController.js';

router.post('/', createAppointment);

export default router;