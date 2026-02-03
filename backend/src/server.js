import app from './app.js';
import connectDB from './config/db.js';
import colors from 'colors'; // عشان الـ Console يبقى شيك



// ربط الداتابيز
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});