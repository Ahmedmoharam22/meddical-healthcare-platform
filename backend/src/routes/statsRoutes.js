import express from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
const router = express.Router();

router.get('/dashboard', getDashboardStats);

export default router;