const { body, validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

exports.validateCheckout = [
  // Validate cart
  body('cart').isArray({ min: 1 }).withMessage('Cart must contain at least one item'),
  body('cart.*.book').isMongoId().withMessage('Invalid book ID'),
  body('cart.*.rentalDays').isInt({ min: 1 }).withMessage('Rental days must be at least 1'),
  body('cart.*.rentalPrice').isFloat({ min: 0 }).withMessage('Invalid rental price'),
  
  // Validate address
  body('address').notEmpty().withMessage('Address is required'),
  
  // Validate contact number
  body('contactNumber')
    .isLength({ min: 11, max: 11 })
    .withMessage('Contact number must be 11 digits')
    .isNumeric()
    .withMessage('Contact number must contain only numbers'),
  
  // Validate payment details
  body('cardNumber')
    .isLength({ min: 16, max: 16 })
    .withMessage('Card number must be 16 digits')
    .isNumeric()
    .withMessage('Card number must contain only numbers'),
  body('cardHolderName').notEmpty().withMessage('Cardholder name is required'),
  body('expiryMonth').notEmpty().withMessage('Expiry month is required'),
  body('expiryYear').notEmpty().withMessage('Expiry year is required'),
  body('cvv')
    .isLength({ min: 3, max: 3 })
    .withMessage('CVV must be 3 digits')
    .isNumeric()
    .withMessage('CVV must contain only numbers'),
  
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }
    next();
  }
];