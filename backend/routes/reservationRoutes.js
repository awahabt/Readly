const express = require('express');
const router = express.Router();
const Reservation = require('../model/Reservation');

// POST /api/reservations
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ success: true, message: 'Reservation submitted successfully.' });
  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(500).json({ success: false, error: 'Server error while submitting reservation.' });
  }
});

module.exports = router;
