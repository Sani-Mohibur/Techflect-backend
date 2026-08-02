import CaseStudy from './caseStudy.model.js';

const getCaseStudys = async (req, res) => {
  const items = await CaseStudy.find();
  res.status(200).json(items);
};

const getCaseStudyById = async (req, res) => {
  const item = await CaseStudy.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  res.status(200).json(item);
};

const createCaseStudy = async (req, res) => {
  const item = await CaseStudy.create(req.body);
  res.status(201).json(item);
};

const updateCaseStudy = async (req, res) => {
  const item = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  res.status(200).json(item);
};

const deleteCaseStudy = async (req, res) => {
  const item = await CaseStudy.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

export { getCaseStudys, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy  };
