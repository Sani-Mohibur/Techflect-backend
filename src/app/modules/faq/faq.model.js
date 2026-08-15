import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  isMock: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('FAQ', faqSchema);