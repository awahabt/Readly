const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: String, // Can be user ID or 'admin'
    required: true
  },
  message: {
    type: String,
    required: true
  },
  link: String,
  type: {
    type: String,
    enum: ['swap-request', 'swap-status', 'system'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);