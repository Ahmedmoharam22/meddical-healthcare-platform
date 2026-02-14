import express from 'express';
const router = express.Router();
import { getDoctors, getDoctorById, getDoctorsBySpecialty, addDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import upload from '../middlewares/uploadMiddleware.js';

router.route('/')
    .get(getDoctors)
    .post(upload.single('image'), addDoctor);
router.route('/:id')
    .get(getDoctorById)
    .put(upload.single('image'), updateDoctor)
    .delete(deleteDoctor);
router.route('/specialty/:slug').get(getDoctorsBySpecialty);

export default router;