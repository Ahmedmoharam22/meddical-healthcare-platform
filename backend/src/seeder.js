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

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // 1. تنظيف الداتابيز من أي داتا قديمة
        await Doctor.deleteMany();
        await Service.deleteMany();
        await Blog.deleteMany();
        await Specialty.deleteMany();

        // 2. إضافة التخصصات الأول (عشان ناخد الـ IDs بتاعتها)
        const createdSpecialties = await Specialty.insertMany(specialties);

        // 3. ربط الدكاترة بالتخصصات
        // هنفترض إن أول دكتور بياخد أول تخصص وهكذا، أو وزعهم زي ما تحب
        const sampleDoctors = doctors.map((doctor, index) => {
            // توزيع التخصصات على الدكاترة (كل دكتور بياخد ID من اللي اتكريتوا)
            const specialtyId = createdSpecialties[index % createdSpecialties.length]._id;
            return { ...doctor, specialty: specialtyId };
        });

        // 4. إضافة الداتا النهائية
        await Doctor.insertMany(sampleDoctors);
        await Service.insertMany(services);
        await Blog.insertMany(blogs);

        console.log('✅ Master Data Imported Successfully!'.green.inverse);
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