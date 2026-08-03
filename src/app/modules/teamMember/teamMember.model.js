import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: { type: String },
  bio: { type: String },
  profilePhotoUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);