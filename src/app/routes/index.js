import express from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import blogRoutes from '../modules/blog/blog.route.js';
import caseStudyRoutes from '../modules/caseStudy/caseStudy.route.js';
import contactRoutes from '../modules/contact/contact.route.js';
import faqRoutes from '../modules/faq/faq.route.js';
import projectRoutes from '../modules/project/project.route.js';
import serviceRoutes from '../modules/service/service.route.js';
import teamMemberRoutes from '../modules/teamMember/teamMember.route.js';
import testimonialRoutes from '../modules/testimonial/testimonial.route.js';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRoutes },
  { path: '/blogs', route: blogRoutes },
  { path: '/case-studies', route: caseStudyRoutes },
  { path: '/contact', route: contactRoutes },
  { path: '/faqs', route: faqRoutes },
  { path: '/projects', route: projectRoutes },
  { path: '/services', route: serviceRoutes },
  { path: '/team-members', route: teamMemberRoutes },
  { path: '/testimonials', route: testimonialRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
