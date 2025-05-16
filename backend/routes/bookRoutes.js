const express = require('express');
const router = express.Router();
const { addBook, getBooks } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware'); // Using existing protect
const upload = require('../middleware/upload');

// Existing routes remain unchanged
router.get('/', getBooks);

// Protected route with file upload
router.post(
  '/',
  protect, 
  upload.array('photos', 5), // Max 5 files
  addBook
);

module.exports = router;