import express from 'express';
import Stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// الفانكشن اللي بتحدث الحالة
const updateBookingStatus = async (bookingId) => {
  try {
    await Booking.findByIdAndUpdate(bookingId, { 
      paymentStatus: 'paid' 
    });
    console.log(`✅ Booking ${bookingId} marked as PAID`);
  } catch (error) {
    console.error("❌ Error updating booking:", error.message);
  }
};

// الـ Webhook Route
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // لما الدفع ينجح فعلياً في سترايب
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // الـ client_reference_id ده إحنا اللي باعتينه لسترايب وهو ID الحجز
    await updateBookingStatus(session.client_reference_id);
  }

  res.json({ received: true });
});

export default router;