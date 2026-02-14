import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

// Models
import Doctor from './models/doctorModel.js';
import Service from './models/serviceModel.js';
import Blog from './models/blogModel.js';
import Specialty from './models/specialtyModel.js';

// Data Files
import doctors from './data/doctors.js';
import services from './data/services.js';
import blogs from './data/blogs.js';
import specialties from './data/specialties.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // 1. تنظيف شامل
        await Doctor.deleteMany();
        await Service.deleteMany();
        await Blog.deleteMany();
        await Specialty.deleteMany();
        await User.deleteMany();

        // 2. إضافة التخصصات (الأساس)
        const createdSpecialties = await Specialty.insertMany(specialties);

        // 4. ربط الدكاترة (كما كنت تفعل)
        const sampleDoctors = doctors.map((doctor, index) => {
            const specialtyId = createdSpecialties[index % createdSpecialties.length]._id;
            return { ...doctor, specialty: specialtyId };
        });
        await Doctor.insertMany(sampleDoctors);

        // 5. إضافة الباقي
        await Service.insertMany(services);
        await Blog.insertMany(blogs);

        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await Doctor.deleteMany();
        await Service.deleteMany();
        await Blog.deleteMany();
        await Specialty.deleteMany();

        console.log('⚠️ Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

// عشان لو كتبت في الـ terminal: node src/seeder -d يمسح الداتا
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}


const seedAdmin = async () => {
  try {
    // 1. مسح أي مستخدمين قدام (اختياري - خلي بالك)
    await User.deleteMany({ email: 'admin@alnoor.com' });

    // 2. بيانات الأدمن الأول
    const adminUser = {
      name: 'سينيور مجمع النور',
      email: 'admin@alnoor.com',
      password: 'admin123456', 
      role: 'admin',
    };

    // 3. الحفظ في الداتابيز
    await User.create(adminUser);

    // console.log('✅ تم إنشاء الأدمن بنجاح! جرب تعمل Login دلوقتي بـ:');
    // console.log('📧 Email: admin@alnoor.com');
    // console.log('🔑 Pass: admin123456');
    
    process.exit();
  } catch (error) {
    console.error(`❌ خطأ في السكريبت: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();