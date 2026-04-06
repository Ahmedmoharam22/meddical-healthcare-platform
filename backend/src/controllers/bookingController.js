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

    // 3. لو الدفع في المجمع (On Site) - خلاص كدة المهمة تمت
    if (paymentMethod === 'on_site') {
      return res.status(201).json({ message: "تم الحجز بنجاح، الدفع عند الوصول", booking });
    }

    // 4. لو الدفع أونلاين - نجهز جلسة سترايب
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'egp',
          product_data: { name: `كشف: ${specialty.name}`, description: `حجز ميعاد بتاريخ ${appointmentDate}` },
          unit_amount: specialty.price * 100, // سترايب بيحسب بالقروش
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      client_reference_id: booking._id.toString(),
    });

    // تحديث الحجز بـ Session ID
    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({ url: session.url }); // بنبعت اللينك للفرونت يفتح صفحة سترايب
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

