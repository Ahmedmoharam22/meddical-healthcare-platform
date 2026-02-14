import express from 'express';
const router = express.Router();
import { getSpecialties, createSpecialty, deleteSpecialty } from '../controllers/specialtyController.js';

router.route('/')
    .get(getSpecialties)
    .post(createSpecialty);

router.route('/:id')
    .delete(deleteSpecialty);
export default router;