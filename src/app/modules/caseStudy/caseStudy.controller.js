import { CaseStudyService } from './caseStudy.service.js';

const getCaseStudys = async (req, res) => {
  const items = await CaseStudyService.getCaseStudys();
  res.status(200).json(items);
};

const getCaseStudyById = async (req, res) => {
  const item = await CaseStudyService.getCaseStudyById(req.params.id);
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  res.status(200).json(item);
};

const createCaseStudy = async (req, res) => {
  const item = await CaseStudyService.createCaseStudy(req.body);
  res.status(201).json(item);
};

const updateCaseStudy = async (req, res) => {
  const item = await CaseStudyService.updateCaseStudy(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  res.status(200).json(item);
};

const deleteCaseStudy = async (req, res) => {
  const item = await CaseStudyService.deleteCaseStudy(req.params.id);
  if (!item) { res.status(404); throw new Error('CaseStudy not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getCaseStudys, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy };
