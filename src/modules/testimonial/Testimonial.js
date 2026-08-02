const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  jobRole: { type: String },
  quoteText: { type: String, required: true },
  avatarUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
