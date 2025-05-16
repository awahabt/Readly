const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../model/user');
const SwapRequest = require('../model/SwapRequest');
const Reservation = require('../model/Reservation');
const Order = require('../model/Order');
const Return = require('../model/Return');
const Notification = require('../model/Notification');

// Get all users
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    // Get swap count for each user
    const usersWithSwapCount = await Promise.all(
      users.map(async (user) => {
        const swapCount = await SwapRequest.countDocuments({ user: user._id });
        return {
          ...user.toObject(),
          swapCount
        };
      })
    );

    res.json({ success: true, data: usersWithSwapCount });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update user status
router.put('/users/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be either "active" or "suspended"'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User ${status} successfully`,
      data: user
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete user
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's swap requests
    await SwapRequest.deleteMany({ user: id });
    
    // Delete user's reservations
    await Reservation.deleteMany({ user: id });
    
    // Delete user's orders
    await Order.deleteMany({ user: id });
    
    // Delete user's returns
    await Return.deleteMany({ user: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get all swap requests
router.get('/swap-requests', protect, admin, async (req, res) => {
  try {
    const swapRequests = await SwapRequest.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: swapRequests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update swap request status
router.put('/swap-requests/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const swapRequest = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!swapRequest) {
      return res.status(404).json({ success: false, message: 'Swap request not found' });
    }
    res.json({ success: true, data: swapRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get all reservations
router.get('/reservations', protect, admin, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'name email')
      .populate('book', 'title author')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reservations });
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update reservation status
router.put('/reservations/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    console.log('Updating reservation:', { id, status });

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    if (!['pending', 'approved', 'rejected', 'expired'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: pending, approved, rejected, expired' 
      });
    }

    // First find the reservation to ensure it exists
    const existingReservation = await Reservation.findById(id);
    if (!existingReservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Reservation not found' 
      });
    }

    // Update the reservation
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: Date.now()
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email')
     .populate('book', 'title author')
     .populate('owner', 'name email');

    if (!reservation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Failed to update reservation' 
      });
    }

    // Create notification for the user
    try {
      await Notification.create({
        user: reservation.user._id,
        recipient: reservation.user._id.toString(),
        message: `Your reservation for "${reservation.book.title}" has been ${status}`,
        type: 'system',
        link: `/reservations/${reservation._id}`
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the request if notification creation fails
    }

    res.json({ 
      success: true, 
      data: reservation,
      message: `Reservation ${status} successfully`
    });
  } catch (err) {
    console.error('Error updating reservation:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Extend reservation
router.put('/reservations/:id/extend', protect, admin, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('user', 'name email')
      .populate('book', 'title author')
      .populate('owner', 'name email');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    if (reservation.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Only approved reservations can be extended' });
    }

    // Calculate new expiry date
    let newExpiryDate;
    if (reservation.expiryDate && !isNaN(new Date(reservation.expiryDate).getTime())) {
      // If current expiry date is valid, add 10 days to it
      newExpiryDate = new Date(reservation.expiryDate);
      newExpiryDate.setDate(newExpiryDate.getDate() + 10);
    } else {
      // If current expiry date is invalid, add 10 days to today
      newExpiryDate = new Date();
      newExpiryDate.setDate(newExpiryDate.getDate() + 10);
    }

    // Ensure the date is valid
    if (isNaN(newExpiryDate.getTime())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Failed to calculate valid expiry date' 
      });
    }

    // Update only the expiry date using findByIdAndUpdate
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          expiryDate: newExpiryDate,
          updatedAt: Date.now()
        }
      },
      { 
        new: true,
        runValidators: false
      }
    ).populate('user', 'name email')
     .populate('book', 'title author')
     .populate('owner', 'name email');

    if (!updatedReservation) {
      return res.status(404).json({ success: false, message: 'Failed to update reservation' });
    }

    // Create notification for the user
    try {
      // Get the user ID from the reservation document
      const userId = reservation.user?._id || reservation.user;
      const bookTitle = reservation.book?.title || 'the book';
      
      if (userId) {
        await Notification.create({
          user: userId,
          recipient: userId.toString(),
          message: `Your reservation for "${bookTitle}" has been extended until ${newExpiryDate.toLocaleDateString()}`,
          type: 'system',
          link: `/reservations/${reservation._id}`
        });
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the request if notification creation fails
    }

    res.json({ 
      success: true, 
      data: updatedReservation,
      message: 'Reservation extended successfully'
    });
  } catch (err) {
    console.error('Error extending reservation:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get all orders
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update order status
router.put('/orders/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get all returns
router.get('/returns', protect, admin, async (req, res) => {
  try {
    const returns = await Return.find()
      .populate('user', 'name email phone_no')
      .populate('book', 'title author')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: returns 
    });
  } catch (err) {
    console.error('Error fetching returns:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Update return status
router.put('/returns/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be one of: pending, approved, rejected, completed' 
      });
    }

    // First find the return request to ensure it exists
    const existingReturn = await Return.findById(id);
    if (!existingReturn) {
      return res.status(404).json({ 
        success: false, 
        message: 'Return request not found' 
      });
    }

    // Update the return request
    const returnRequest = await Return.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: Date.now()
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email phone_no')
     .populate('book', 'title author');

    if (!returnRequest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Failed to update return request' 
      });
    }

    // Create notification for the user
    try {
      await Notification.create({
        user: returnRequest.user._id,
        recipient: returnRequest.user._id.toString(),
        message: `Your return request for "${returnRequest.book.title}" has been ${status}`,
        type: 'system',
        link: `/returns/${returnRequest._id}`
      });
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the request if notification creation fails
    }

    res.json({ 
      success: true, 
      data: returnRequest,
      message: `Return request ${status} successfully`
    });
  } catch (err) {
    console.error('Error updating return request:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get dashboard stats
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const [users, swapRequests, reservations, orders, returns] = await Promise.all([
      User.countDocuments(),
      SwapRequest.countDocuments(),
      Reservation.countDocuments(),
      Order.countDocuments(),
      Return.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        users,
        swapRequests,
        reservations,
        orders,
        returns
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router; 