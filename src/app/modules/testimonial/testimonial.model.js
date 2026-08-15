import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  jobRole: { type: String },
  quoteText: { type: String, required: true },
  avatarUrl: { type: String },
  isHidden: { type: Boolean, default: false },
  isMock: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);