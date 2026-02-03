import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import doctorRoutes from './routes/doctorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';

dotenv.config();

const app = express();

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


export default app;