const SwapRequest = require('../model/SwapRequest');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

exports.createSwapRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('User ID:', userId);
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    if (!req.body.data) {
      return res.status(400).json({
        success: false,
        message: 'Missing data field in the request body',
      });
    }

    // Parse the "data" field once
    let parsedData;
    try {
      parsedData = JSON.parse(req.body.data); // <- Only one parse needed
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON in data field',
        error: err.message,
      });
    }

    const { bookHave, bookWant, delivery } = parsedData;

    if (!bookHave || !bookWant || !delivery) {
      return res.status(400).json({
        success: false,
        message: 'Missing bookHave, bookWant, or delivery information',
      });
    }

    // Validate images
    const bookHaveImages = req.files['bookHaveImages'];
    const bookWantImages = req.files['bookWantImages'];

    if (!bookHaveImages || bookHaveImages.length !== 2) {
      return res.status(400).json({ 
        success: false,
        message: 'Please upload exactly 2 images for the book you have' 
      });
    }

    if (!bookWantImages || bookWantImages.length !== 2) {
      return res.status(400).json({ 
        success: false,
        message: 'Please upload exactly 2 images for the book you want' 
      });
    }

    // Upload images
    const uploadImage = async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'book-swaps'
      });
      fs.unlinkSync(file.path); // Clean up temp file
      return result.secure_url;
    };

    const bookHaveImageUrls = await Promise.all(
      bookHaveImages.map(uploadImage)
    );
    const bookWantImageUrls = await Promise.all(
      bookWantImages.map(uploadImage)
    );

    // Save swap request
    const swapRequest = new SwapRequest({
      user: userId,
      bookHave: {
        ...bookHave,
        images: bookHaveImageUrls
      },
      bookWant: {
        ...bookWant,
        images: bookWantImageUrls
      },
      delivery
    });

    await swapRequest.save();

    res.status(201).json({
      success: true,
      message: 'Swap request created successfully',
      data: swapRequest
    });

  } catch (error) {
    console.error('Error creating swap request:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};



exports.getUserSwapRequests = async (req, res) => {
  try {
    const swapRequests = await SwapRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: swapRequests.length,
      data: swapRequests
    });
  } catch (error) {
    console.error('Error fetching swap requests:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

exports.getSwapRequestDetails = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!swapRequest) {
      return res.status(404).json({ 
        success: false,
        message: 'Swap request not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    console.error('Error fetching swap request details:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

exports.cancelSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findOneAndUpdate(
      { 
        _id: req.params.id, 
        user: req.user._id,
        status: 'pending'
      },
      { status: 'rejected' },
      { new: true }
    );

    if (!swapRequest) {
      return res.status(404).json({ 
        success: false,
        message: 'Swap request not found or cannot be canceled' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Swap request canceled successfully',
      data: swapRequest
    });
  } catch (error) {
    console.error('Error canceling swap request:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};