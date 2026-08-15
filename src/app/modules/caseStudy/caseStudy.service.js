import CaseStudy from './caseStudy.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getCaseStudys = async (query) => {
  const caseStudyQuery = new QueryBuilder(CaseStudy.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await caseStudyQuery.modelQuery;
};

const getCaseStudyById = async (id) => {
  const item = await CaseStudy.findById(id);
  if (!item) {
    throw new AppError(404, 'CaseStudy not found');
  }
  return item;
};

const createCaseStudy = async (payload) => {
  return await CaseStudy.create(payload);
};

const updateCaseStudy = async (id, payload) => {
  const item = await CaseStudy.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'CaseStudy not found');
  }
  return item;
};

const deleteCaseStudy = async (id) => {
  const item = await CaseStudy.findById(id);
  if (!item) {
    throw new AppError(404, 'CaseStudy not found');
  }
  if (item.isMock) {
    throw new AppError(403, 'Mock data cannot be deleted');
  }
  await item.deleteOne();
  return item;
};

export const CaseStudyService = {
  getCaseStudys,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
};
