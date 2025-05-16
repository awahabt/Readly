const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SwapRequestHome = require('../model/SwapRequestHome');
const SwapBook = require('../model/SwapBook');

// @route   GET api/swaps/approved
// @desc    Get all approved swap requests
// @access  Private
router.get('/approved', auth, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ status: 'approved' })
      .populate('requester', 'name email')
      .populate('bookHave')
      .populate('bookWant');
      
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/swaps/:id/reject
// @desc    Reject a swap request
// @access  Private
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const request = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/swaps/:id/accept
// @desc    Accept a swap request and add delivery details
// @access  Private
router.put('/:id/accept', auth, async (req, res) => {
  const { method, address, date, notes } = req.body;
  
  try {
    const request = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'accepted',
        deliveryDetails: {
          method,
          address,
          date,
          notes
        }
      },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    
    // Mark books as unavailable
    await Book.findByIdAndUpdate(request.bookHave, { availableForSwap: false });
    await Book.findByIdAndUpdate(request.bookWant, { availableForSwap: false });
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;