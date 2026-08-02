const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: { type: String },
  bio: { type: String },
  profilePhotoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
