import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.bold);
        process.exit(1); // يقفل السيرفر لو مفيس اتصال
    }
};

export default connectDB;