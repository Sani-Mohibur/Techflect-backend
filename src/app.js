import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { errorHandler, notFound  } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

// Connect to database
connectDB();

// Routes imports
import authRoutes from './modules/auth/auth.route.js';
import contactRoutes from './modules/contact/contact.route.js';
import serviceRoutes from './modules/service/service.route.js';
import projectRoutes from './modules/project/project.route.js';
import caseStudyRoutes from './modules/caseStudy/caseStudy.route.js';
import testimonialRoutes from './modules/testimonial/testimonial.route.js';
import blogRoutes from './modules/blog/blog.route.js';
import teamMemberRoutes from './modules/teamMember/teamMember.route.js';
import faqRoutes from './modules/faq/faq.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes here
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/faqs', faqRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;