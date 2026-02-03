import express from 'express';
const router = express.Router();
import { getServices, getServiceBySlug } from '../controllers/serviceController.js';

router.route('/').get(getServices);
router.get('/:slug', getServiceBySlug);

export default router;