const Order = require('../models/Order');
const Book = require('../models/Book');
const Payment = require('../models/Payment');
const { processPayment } = require('../utils/paymentProcessor');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Private
exports.processCheckout = asyncHandler(async (req, res, next) => {
  const { 
    cart, 
    address, 
    contactNumber, 
    paymentMethod,
    cardNumber,
    cardHolderName,
    expiryMonth,
    expiryYear,
    cvv
  } = req.body;

  // Validate cart
  if (!cart || cart.length === 0) {
    return next(new ErrorResponse('Cart is empty', 400));
  }

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.rentalPrice * item.rentalDays);
  }, 0);

  // Verify books exist and are available
  const bookIds = cart.map(item => item.book);
  const books = await Book.find({ _id: { $in: bookIds } });

  if (books.length !== cart.length) {
    return next(new ErrorResponse('One or more books not found', 404));
  }

  // Create order
  const order = await Order.create({
    user: req.user.id,
    books: cart.map(item => ({
      book: item.book,
      rentalDays: item.rentalDays,
      rentalPrice: item.rentalPrice
    })),
    totalPrice,
    address,
    contactNumber,
    paymentMethod
  });

  // Process payment
  const paymentResult = await processPayment({
    amount: totalPrice + 100, // Including delivery charges
    paymentMethod,
    cardNumber,
    cardHolderName,
    expiryMonth,
    expiryYear,
    cvv,
    orderId: order._id
  });

  // Create payment record
  const payment = await Payment.create({
    order: order._id,
    amount: paymentResult.amount,
    paymentMethod,
    cardLastFour: paymentResult.cardLastFour,
    transactionId: paymentResult.transactionId,
    status: paymentResult.status,
    paymentDetails: {
      cardHolderName,
      expiryMonth,
      expiryYear
    }
  });

  // Update order payment status
  order.paymentStatus = payment.status;
  await order.save();

  // Update book availability if payment successful
  if (payment.status === 'completed') {
    await Book.updateMany(
      { _id: { $in: bookIds } },
      { $inc: { availableQuantity: -1 } }
    );
  }

  res.status(201).json({
    success: true,
    data: {
      order,
      payment
    }
  });
});

// @desc    Get user orders
// @route   GET /api/checkout/orders
// @access  Private
exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('books.book')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});