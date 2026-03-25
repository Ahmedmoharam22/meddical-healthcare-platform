import express from 'express';
import { addMedicine, getMedicines, updateStock, deleteMedicine } from '../controllers/medicineController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/')
  .get(getMedicines)
  .post(protect, admin, addMedicine);

router.route('/:id/stock')
  .put(protect, admin, updateStock);

router.route('/:id')
  .delete(protect, admin, deleteMedicine);

export default router;