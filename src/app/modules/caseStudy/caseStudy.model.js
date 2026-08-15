import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  sector: { type: String },
  teamSize: { type: String },
  challenge: { type: String },
  approach: { type: String },
  outcome: { type: String },
  keyStats: [{
    number: { type: String },
    label: { type: String }
  }],
  isHidden: { type: Boolean, default: false },
  isMock: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('CaseStudy', caseStudySchema);