import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String },
  thumbnailUrl: { type: String },
  contentHtml: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);