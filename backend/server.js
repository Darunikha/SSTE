const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Environment Variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Security & Logging Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/quotes', require('./routes/quoteRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api', require('./routes/dataRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sri Sastha Textile Engineering REST API is operational',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Sri Sastha Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
