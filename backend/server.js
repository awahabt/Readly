require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const bookRoutes = require('./routes/bookRoutes');
const swapRoutes = require('./routes/swapRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const returnRoutes = require('./routes/returnRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const passport = require('passport');
const path = require('path');

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true,
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// Make uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/swap-requests', swapRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/return', returnRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is working!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate key error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'A record with this value already exists'
      });
    }
    
    if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
      return res.status(503).json({
        success: false,
        message: 'Database connection error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Service temporarily unavailable'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Database error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: err.message
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Handle timeout errors
  if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
    return res.status(504).json({
      success: false,
      message: 'Request timeout',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Request took too long to complete'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));