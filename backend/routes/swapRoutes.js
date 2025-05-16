const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const swapController = require('../controllers/swapController');
const upload = require('../middleware/uploadMiddleware');
const SwapRequest = require('../model/SwapRequest');
const Notification = require('../model/Notification');

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

// Update swap request status (admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be either "approved" or "rejected"'
      });
    }

    const swapRequest = await SwapRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Create notification for the user
    await Notification.create({
      user: swapRequest.user._id,
      recipient: swapRequest.user._id,
      message: `Your swap request has been ${status}`,
      type: 'swap-status',
      link: `/swap-requests/${swapRequest._id}`
    });

    res.json({
      success: true,
      message: `Swap request ${status} successfully`,
      data: swapRequest
    });
  } catch (error) {
    console.error('Error updating swap request status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;