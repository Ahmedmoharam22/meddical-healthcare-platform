import express from 'express';
const router = express.Router();
import { getDoctors, getDoctorById } from '../controllers/doctorController.js';

router.route('/').get(getDoctors);
router.route('/:id').get(getDoctorById);

export default router;