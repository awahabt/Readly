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
const passport = require('passport');
const path = require('path');

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Specify which headers are allowed
  credentials: true,  // Allow credentials (cookies, Authorization headers, etc.)
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
app.use('/api/profile', profileRoutes);
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: err.message || 'Server Error' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));