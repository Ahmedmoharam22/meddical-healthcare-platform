import app from './app.js';
import connectDB from './config/db.js';
import colors from 'colors'; 


connectDB();
const PORT = process.env.PORT || 5000;

const updatePrices = async () => {
  await Specialty.updateMany(
    { price: { $exists: false } }, // أي تخصص ملوش سعر
    { $set: { price: 60 } }        // حط له 500 جنيه
  );
  console.log("✅ تم تحديث جميع التخصصات بالأسعار الافتراضية");
};
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
// Trigger restart