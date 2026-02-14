import express from 'express';
const router = express.Router();
import { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  getUsers 
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
// المسارات العامة
router.post('/login', loginUser);
router.post('/register', registerUser); 

// المسارات المحمية
router.get('/profile', protect, getUserProfile);

// مسارات الأدمن فقط
router.get('/', protect, admin, getUsers);

export default router;