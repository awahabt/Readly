const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  },
  pickupAddress: {
    type: String,
    required: [true, 'Pickup address is required']
  },
  returnDate: {
    type: Date,
    default: Date.now
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamp before saving
returnSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for better query performance
returnSchema.index({ user: 1, status: 1 });
returnSchema.index({ book: 1, status: 1 });

module.exports = mongoose.model('Return', returnSchema);