import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  iconColorTheme: { type: String },
  imageUrl: { type: String },
  features: [{ type: String }],
  isHidden: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);