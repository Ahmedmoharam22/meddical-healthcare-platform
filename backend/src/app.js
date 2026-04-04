import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import doctorRoutes from './routes/doctorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import diagnosticRoutes from './routes/diagnosticRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';


dotenv.config();    

const app = express();
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/diagnostics', diagnosticRoutes);
app.use('/api/medicines', medicineRoutes);  
app.use('/api/schedules', scheduleRoutes);  


export default app;