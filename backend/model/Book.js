// models/Book.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  photos: [photoSchema],
  author: { 
    type: String, 
    required: [true, 'Please add an author'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Islamic',
      'Urdu',
      'History',
      'Law',
      'IT',
      'Business',
      'Science',
      'Mathematics'
    ]
  },
  edition: { 
    type: String, 
    required: [true, 'Please add an edition'] 
  },
  rentPerDay: { 
    type: Number, 
    required: [true, 'Please add rent per day'],
    min: [0, 'Rent cannot be negative'],
    max: [20, 'Rent cannot exceed 20 RS']
  },
  availableQuantity: { 
    type: Number, 
    required: [true, 'Please add available quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);