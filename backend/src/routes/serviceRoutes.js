import express from 'express';
const router = express.Router();
import { getServices, getServiceBySlug, createService, deleteService, updateService } from '../controllers/serviceController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/')
    .get(getServices)
    .post(protect, admin, createService);

router.route('/:slug')
    .get(getServiceBySlug);

router.route('/:id')
    .delete(protect, admin, deleteService)
    .put(protect, admin, updateService);

export default router;