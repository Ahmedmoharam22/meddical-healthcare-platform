import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById } from '../controllers/blogController.js';

router.route('/').get(getBlogs);
router.route('/:id').get(getBlogById);

export default router;