import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import {protect} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
router.route('/').get(getBlogs).post(protect, upload.single('image'), createBlog);
router.route('/:id').get(getBlogById).put(protect, upload.single('image'), updateBlog).delete(protect, deleteBlog);

export default router;