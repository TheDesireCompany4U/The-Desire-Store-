import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
  }],
  email: { type: String, required: true },
  total: { type: Number, required: true },
  stripePaymentId: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
