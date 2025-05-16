const Book = require('../model/Book');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

exports.addBook = asyncHandler(async (req, res, next) => {
  // Verify user is authenticated (using existing protect middleware)
  if (!req.user) {
    return next(new ErrorResponse('Not authorized to add books', 401));
  }

  // Attach user as owner
  req.body.owner = req.user.id;

  // Validate required fields
  const requiredFields = ['title', 'description', 'author', 'category', 'edition', 'rentPerDay', 'availableQuantity'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return next(new ErrorResponse(`Please provide ${field}`, 400));
    }
  }
  console.log(req.files)
  // Handle file uploads to Cloudinary
let photoUploads = [];

if (req.files && req.files.length > 0) {
  const filesArray = req.files;

  for (const file of filesArray) {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        throw new Error("Only JPG, JPEG, and PNG files are allowed");
      }

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "book-uploads",
        width: 1500,
        crop: "scale",
        quality: "auto",
      });

      photoUploads.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      fs.unlinkSync(file.path);
    } catch (uploadError) {
      for (const photo of photoUploads) {
        await cloudinary.uploader.destroy(photo.public_id);
      }
      return next(
        new ErrorResponse(`File upload failed: ${uploadError.message}`, 400)
      );
    }
  }

  req.body.photos = photoUploads;
} else {
  return next(new ErrorResponse("Please upload at least one photo", 400));
}


  // Create book
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    data: book
  });
});

// Existing getBooks function remains unchanged
exports.getBooks = asyncHandler(async (req, res, next) => {

  const books = await Book.find();
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});