import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import Specialty from '../models/specialtyModel.js';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async (req, res) => {
  const { doctorId, specialtyId, patientName, patientPhone, appointmentDate, paymentMethod } = req.body;

  try {
    // 1. هات بيانات التخصص عشان السعر
    const specialty = await Specialty.findById(specialtyId);
    if (!specialty) return res.status(404).json({ message: "التخصص غير موجود" });

    // 2. إنشاء الحجز في الداتا بيز (Pending)
    const booking = await Booking.create({
      doctor: doctorId,
      specialty: specialtyId,
      patientName,
      patientPhone,
      appointmentDate,
      amount: specialty.price,
      paymentMethod
    });

    if (paymentMethod === 'on_site') {
      return res.status(201).json({ message: "تم الحجز بنجاح، الدفع عند الوصول", booking });
    }

    const basePrice = Number(specialty.price) || 60; 
    const stripeAmount = Math.max(Math.round(basePrice * 100), 5000); 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: 'egp',
      metadata: { bookingId: booking._id.toString() },
    });

    // تحديث الحجز بـ PaymentIntent ID
    booking.stripeSessionId = paymentIntent.id;
    await booking.save();

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patientPhone: req.body.patientPhone })
      .populate('doctor', 'name')
      .populate('specialty', 'name')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

