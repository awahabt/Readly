const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, 'Book name is required'],
    trim: true,
    maxlength: [100, 'Book name cannot exceed 100 characters']
  },
  pickupAddress: {
    type: String,
    required: [true, 'Pickup address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  country: {
    type: String,
    required: true,
    enum: ['PK'],
    default: 'PK'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ReturnSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Return', ReturnSchema);