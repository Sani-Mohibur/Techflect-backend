import { CaseStudyService } from './caseStudy.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getCaseStudys = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'title']);
  const items = await CaseStudyService.getCaseStudys(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Case studies retrieved successfully',
    data: items,
  });
});

const getCaseStudyById = catchAsync(async (req, res) => {
  const item = await CaseStudyService.getCaseStudyById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Case study retrieved successfully',
    data: item,
  });
});

const createCaseStudy = catchAsync(async (req, res) => {
  const item = await CaseStudyService.createCaseStudy(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Case study created successfully',
    data: item,
  });
});

const updateCaseStudy = catchAsync(async (req, res) => {
  const item = await CaseStudyService.updateCaseStudy(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Case study updated successfully',
    data: item,
  });
});

const deleteCaseStudy = catchAsync(async (req, res) => {
  const item = await CaseStudyService.deleteCaseStudy(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Case study deleted successfully',
    data: item,
  });
});

export { getCaseStudys, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy };
