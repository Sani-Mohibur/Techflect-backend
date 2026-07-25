const fs = require('fs');
const path = require('path');

const baseDir = '/home/niloy/Personal/Techflect/Backend';

const dirs = [
  'src/config',
  'src/models',
  'src/controllers',
  'src/routes',
  'src/middleware',
  'src/utils',
  'scripts'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

// .env
fs.writeFileSync(path.join(baseDir, '.env'), `PORT=5000
MONGODB_URI=mongodb+srv://nhumayun291_db_user:NFzCgapURDxy7jW3@techflect.fkefczr.mongodb.net/?appName=Techflect
JWT_SECRET=supersecretjwtkey_change_in_production
EMAIL_USER=nhumayun291@gmail.com
EMAIL_PASS=YOUR_APP_PASSWORD_HERE
`);

// src/config/db.js
fs.writeFileSync(path.join(baseDir, 'src/config/db.js'), `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
`);

// src/middleware/errorMiddleware.js
fs.writeFileSync(path.join(baseDir, 'src/middleware/errorMiddleware.js'), `const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(\`Not Found - \${req.originalUrl}\`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
`);

// src/middleware/authMiddleware.js
fs.writeFileSync(path.join(baseDir, 'src/middleware/authMiddleware.js'), `const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };
`);

// src/utils/emailService.js
fs.writeFileSync(path.join(baseDir, 'src/utils/emailService.js'), `const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host and port
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email, // Can be sent to the admin or user
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
`);

// Create models boilerplate
const models = [
  { name: 'Admin', schema: "email: { type: String, required: true, unique: true }, password: { type: String, required: true }" },
  { name: 'Service', schema: "title: { type: String, required: true }, description: { type: String }, iconColorTheme: { type: String }, imageUrl: { type: String }, features: [{ type: String }], isHidden: { type: Boolean, default: false }" },
  { name: 'Project', schema: "name: { type: String, required: true }, description: { type: String }, heroImageUrl: { type: String }, accentColor: { type: String }, tags: [{ type: String }]" },
  { name: 'CaseStudy', schema: "clientName: { type: String, required: true }, sector: { type: String }, teamSize: { type: String }, challenge: { type: String }, approach: { type: String }, outcome: { type: String }, keyStats: [{ number: String, label: String }]" },
  { name: 'Testimonial', schema: "clientName: { type: String, required: true }, jobRole: { type: String }, quoteText: { type: String, required: true }, avatarUrl: { type: String }" },
  { name: 'Blog', schema: "title: { type: String, required: true }, excerpt: { type: String }, category: { type: String }, thumbnailUrl: { type: String }, contentHtml: { type: String, required: true }" },
  { name: 'TeamMember', schema: "name: { type: String, required: true }, jobTitle: { type: String }, bio: { type: String }, profilePhotoUrl: { type: String }" },
  { name: 'FAQ', schema: "question: { type: String, required: true }, answer: { type: String, required: true }" },
  { name: 'Contact', schema: "name: { type: String, required: true }, email: { type: String, required: true }, subject: { type: String }, message: { type: String, required: true }, status: { type: String, default: 'Unread' }" },
];

models.forEach(m => {
  fs.writeFileSync(path.join(baseDir, 'src/models', m.name + '.js'), 
"const mongoose = require('mongoose');\n\n" +
"const schema = new mongoose.Schema({\n" +
"  " + m.schema + "\n" +
"}, { timestamps: true });\n\n" +
"module.exports = mongoose.model('" + m.name + "', schema);\n"
  );
});

// App.js
fs.writeFileSync(path.join(baseDir, 'src/app.js'), `const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Routes imports
// We will add them next

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes here

app.use(notFound);
app.use(errorHandler);

module.exports = app;
\`);

// Server.js
fs.writeFileSync(path.join(baseDir, 'src/server.js'), \`require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(\\\`Server running on port \\\${PORT}\\\`));
\`);

// scripts/seedAdmin.js
fs.writeFileSync(path.join(baseDir, 'scripts/seedAdmin.js'), \`require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/db');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.EMAIL_USER });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }
    
    // Create new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Default password
    
    await Admin.create({
      email: process.env.EMAIL_USER,
      password: hashedPassword
    });
    
    console.log('Admin user seeded successfully with email: ' + process.env.EMAIL_USER + ' and password: admin123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
\`);

console.log('Setup script completed.');
