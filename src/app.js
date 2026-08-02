require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Routes imports
const authRoutes = require('./modules/auth/authRoutes');
const contactRoutes = require('./modules/contact/contactRoutes');
const serviceRoutes = require('./modules/service/serviceRoutes');
const projectRoutes = require('./modules/project/projectRoutes');
const caseStudyRoutes = require('./modules/caseStudy/caseStudyRoutes');
const testimonialRoutes = require('./modules/testimonial/testimonialRoutes');
const blogRoutes = require('./modules/blog/blogRoutes');
const teamMemberRoutes = require('./modules/teamMember/teamMemberRoutes');
const faqRoutes = require('./modules/faq/fAQRoutes');

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
