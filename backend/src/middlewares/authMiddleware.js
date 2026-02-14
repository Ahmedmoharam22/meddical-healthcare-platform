import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // بنجيب بيانات المستخدم من غير الباسورد ونحطها في الـ request
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'غير مصرح لك، التوكن غير صحيح' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'غير مصرح لك، لا يوجد توكن' });
  }
};

// Middleware للتأكد إن المستخدم Admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'غير مصرح لك، هذه الصلاحية للمديرين فقط' });
  }
};