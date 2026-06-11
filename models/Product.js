import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true, default: 0 },
  sku: { type: String, unique: true },
  category: String,
  images: [String],
  colors: [String],
  active: { type: Boolean, default: true },
  brand: { type: String, default: 'Desires' },
  flag: String,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
