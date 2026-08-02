require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Routes imports
const authRoutes = require('./modules/auth/auth.route');
const contactRoutes = require('./modules/contact/contact.route');
const serviceRoutes = require('./modules/service/service.route');
const projectRoutes = require('./modules/project/project.route');
const caseStudyRoutes = require('./modules/caseStudy/caseStudy.route');
const testimonialRoutes = require('./modules/testimonial/testimonial.route');
const blogRoutes = require('./modules/blog/blog.route');
const teamMemberRoutes = require('./modules/teamMember/teamMember.route');
const faqRoutes = require('./modules/faq/faq.route');

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

module.exports = app;
