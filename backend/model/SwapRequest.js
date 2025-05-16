const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  bookHave: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: String,
    condition: { 
      type: String, 
      enum: ['like-new', 'very-good', 'good', 'acceptable'],
      default: 'very-good'
    },
    description: String,
    images: [String]
  },
  bookWant: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: String,
    condition: { 
      type: String, 
      enum: ['like-new', 'very-good', 'good', 'acceptable'],
      default: 'good'
    },
    alternatives: String,
    images: [String]
  },
  delivery: {
    method: { 
      type: String, 
      enum: ['pickup', 'delivery'],
      default: 'pickup'
    },
    address: String,
    date: { type: Date, required: true },
    notes: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);