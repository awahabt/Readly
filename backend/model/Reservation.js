const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  bookTitle: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String },
  rentalStart: { type: Date, required: true },
  rentalEnd: { type: Date, required: true },
  pickupLocation: { type: String },
  homeDelivery: { type: Boolean, default: false },
  deliveryAddress: { type: String },
  notes: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
