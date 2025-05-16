const express = require('express');
const router = express.Router();
const swapController = require ('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Protect all routes
router.use(protect);

// Create a new swap request
router.post(
  '/',
  upload.fields([
    { name: 'bookHaveImages', maxCount: 2 },
    { name: 'bookWantImages', maxCount: 2 }
  ]),
  swapController.createSwapRequest
);

// Get all swap requests for the user
router.get('/', swapController.getUserSwapRequests);

// Get single swap request details
router.get('/:id', swapController.getSwapRequestDetails);

// Cancel a swap request
router.patch('/:id/cancel', swapController.cancelSwapRequest);

module.exports = router;