import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  heroImageUrl: { type: String },
  accentColor: { type: String },
  tags: [{ type: String }],
  isHidden: { type: Boolean, default: false },
  isMock: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);