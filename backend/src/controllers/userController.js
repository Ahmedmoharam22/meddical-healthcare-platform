import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// دالة مساعدة لتوليد التوكن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    تسجيل مستخدم جديد (Admin/Doctor)
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // // حماية: الـ Register في الداشبورد لازم يتم بـ Secret Key
  // if (secretKey !== process.env.ADMIN_REGISTRATION_KEY) {
  //   return res.status(401).json({ message: "مفتاح التسجيل السري غير صحيح" });
  // }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "هذا البريد مسجل بالفعل" });

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "بيانات غير صالحة" });
  }
};

// @desc    تسجيل الدخول
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
  }
};

// @desc    عرض بيانات المستخدم الحالي
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(404).json({ message: "المستخدم غير موجود" });
  }
};

// @desc    جلب كل المستخدمين (للأدمن فقط)
export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};