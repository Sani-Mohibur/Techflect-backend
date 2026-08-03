import CaseStudy from './caseStudy.model.js';

const getCaseStudys = async () => {
  return await CaseStudy.find();
};

const getCaseStudyById = async (id) => {
  return await CaseStudy.findById(id);
};

const createCaseStudy = async (payload) => {
  return await CaseStudy.create(payload);
};

const updateCaseStudy = async (id, payload) => {
  return await CaseStudy.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCaseStudy = async (id) => {
  const item = await CaseStudy.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const CaseStudyService = {
  getCaseStudys,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
};
