import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import Specialty from '../models/specialtyModel.js';
import Message from '../models/Message.js';
import Blog from '../models/blogModel.js';

export const getDashboardStats = async (req, res) => {
  try {
    // 1. حساب الحجوزات حسب التخصص (Specialty)
    const appointmentsBySpecialty = await Appointment.aggregate([
      { $lookup: { from: 'doctors', localField: 'doctor', foreignField: '_id', as: 'doctorInfo' } },
      { $unwind: '$doctorInfo' },
      { $group: { _id: '$doctorInfo.specialty', count: { $sum: 1 } } }
    ]);

    // 2. حساب حالات الحجز (Status Distribution)
    const statusStats = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // 3. معدل الزيارات الأسبوعي (آخر 7 أيام)
    const last7Days = await Appointment.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 4. الأرقام الإجمالية لبطاقات لوحة التحكم
    const [totalDoctors, totalSpecialties, totalMessages, totalBlogs] = await Promise.all([
      Doctor.countDocuments(),
      Specialty.countDocuments(),
      Message.countDocuments(),
      Blog.countDocuments(),
    ]);

    res.json({
      appointmentsBySpecialty,
      statusStats,
      last7Days,
      totalDoctors,
      totalSpecialties,
      totalMessages,
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};