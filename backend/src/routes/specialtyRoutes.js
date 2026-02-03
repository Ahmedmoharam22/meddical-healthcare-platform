import express from 'express';
const router = express.Router();
import { getSpecialties, createSpecialty } from '../controllers/specialtyController.js';

router.route('/')
    .get(getSpecialties)
    .post(createSpecialty);

export default router;