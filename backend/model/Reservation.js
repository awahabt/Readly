const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected', 'expired'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required'],
    validate: {
      validator: function(v) {
        return v > this.requestDate;
      },
      message: 'Expiry date must be after request date'
    }
  },
  deliveryMethod: {
    type: String,
    enum: {
      values: ['delivery', 'pickup'],
      message: '{VALUE} is not a valid delivery method'
    },
    default: 'pickup'
  },
  deliveryAddress: {
    type: String,
    validate: {
      validator: function(v) {
        return this.deliveryMethod === 'pickup' || (this.deliveryMethod === 'delivery' && v && v.length > 0);
      },
      message: 'Delivery address is required when delivery method is delivery'
    }
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
reservationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for better query performance
reservationSchema.index({ user: 1, status: 1 });
reservationSchema.index({ book: 1, status: 1 });
reservationSchema.index({ owner: 1, status: 1 });

// Add method to check if reservation is expired
reservationSchema.methods.isExpired = function() {
  return this.expiryDate < new Date();
};

// Add method to extend reservation
reservationSchema.methods.extend = async function(days = 7) {
  const newExpiryDate = new Date(this.expiryDate);
  newExpiryDate.setDate(newExpiryDate.getDate() + days);
  this.expiryDate = newExpiryDate;
  return this.save();
};

module.exports = mongoose.model('Reservation', reservationSchema);
