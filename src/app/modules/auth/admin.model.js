import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'moderator'], default: 'admin' },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);