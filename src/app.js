import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './app/middleware/globalErrorHandler.js';
import notFound from './app/middleware/notFound.js';
import connectDB from './app/config/db.js';
import routes from './app/routes/index.js';
import config from './app/config/index.js';

// Connect to database
connectDB();

const app = express();

app.use(cors({
  origin: config.frontend_url,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes here
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;