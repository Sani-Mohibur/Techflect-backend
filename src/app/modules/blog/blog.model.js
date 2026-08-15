import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String },
  thumbnailUrl: { type: String },
  contentHtml: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  isMock: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);