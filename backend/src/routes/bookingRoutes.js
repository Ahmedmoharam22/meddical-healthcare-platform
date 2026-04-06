import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', createBooking);

router.get('/my-bookings', protect, getMyBookings);

export default router;