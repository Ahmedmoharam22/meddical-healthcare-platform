import express from 'express';
import { getSchedules, addSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';
import { protect, admin } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.route('/')
  .get(getSchedules)
  .post(protect, admin, addSchedule); 

router.route('/:id')
  .put(protect, admin, updateSchedule)
  .delete(protect, admin, deleteSchedule);

export default router;