const express = require('express');
const router = express.Router();
const Return = require('../model/Return');
const { check, validationResult } = require('express-validator');

// @route   POST api/returns
// @desc    Create a book return request
// @access  Public
router.post('/', [
  check('bookName', 'Book name is required').not().isEmpty(),
  check('pickupAddress', 'Pickup address is required').not().isEmpty(),
  check('contactNumber', 'Contact number is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Additional validation for Pakistani numbers
    if (req.body.country === 'PK' && !/^3\d{9}$/.test(req.body.contactNumber)) {
      return res.status(400).json({ 
        errors: [{ 
          msg: 'Pakistani contact numbers must start with 3 and be 10 digits long' 
        }] 
      });
    }

    const newReturn = new Return(req.body);
    await newReturn.save();
    
    res.status(201).json({ 
      message: 'Return request submitted successfully',
      return: newReturn
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/returns
// @desc    Get all return requests
// @access  Public
router.get('/', async (req, res) => {
  try {
    const returns = await Return.find().sort({ createdAt: -1 });
    res.json(returns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;