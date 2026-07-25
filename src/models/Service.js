const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  iconColorTheme: { type: String },
  imageUrl: { type: String },
  features: [{ type: String }],
  isHidden: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
