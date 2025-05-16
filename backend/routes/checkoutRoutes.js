const order = require('../model/Order');
const express = require('express');
const router = express.Router();
const { 
  processCheckout,
  getUserOrders
} = require('../controllers/checkoutController');
const { protect } = require('../middleware/auth');
const validateCheckout = require('../middleware/validateCheckout');

router.route('/')
  .post(protect, validateCheckout, processCheckout);

router.route('/order')
  .get(protect, getUserOrders);

module.exports = router;