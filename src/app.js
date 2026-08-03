import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './app/middleware/globalErrorHandler.js';
import connectDB from './app/config/db.js';
import routes from './app/routes/index.js';

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes here
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;