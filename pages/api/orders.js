import dbConnect from '../../lib/mongodb';
import Order from '../../models/Order';
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { items, email, total } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100),
        currency: 'usd',
        receipt_email: email,
      });
      const order = new Order({
        items,
        email,
        total,
        stripePaymentId: paymentIntent.id,
        status: 'pending',
      });
      await order.save();
      res.status(201).json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create order' });
    }
  }
}
