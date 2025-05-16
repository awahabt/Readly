const express = require('express');
const router = express.Router();
const ContactMessage = require('../model/ContactMessage');
const nodemailer = require('nodemailer');
require('dotenv').config();
// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phoneNo, message } = req.body;

  // Basic server-side validation
  if (!name || name.length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  if (phoneNo && !/^[\d\s+-]+$/.test(phoneNo)) {
    return res.status(400).json({ message: 'Invalid phone number.' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters.' });
  }

  try {
    // Save to MongoDB
    const newMessage = new ContactMessage({ name, email, phoneNo, message });
    await newMessage.save();
    console.log(process.env.EMAIL_RECEIVER)
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service like "SendGrid", "Outlook"
      auth: {
        user: process.env.SMTP_HOST, // your Gmail address
        pass: process.env.SMTP_PASSWORD  // app-specific password or real password (if allowed)
      }
    });

    // Email content
    const mailOptions = {
      from: "mundainnocent794@gmail.com",
      to: "mundainnocent794@gmail.com", // where to send the contact message
      subject: 'New Contact Message Received',
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNo || 'N/A'}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Your message has been received. We will contact you soon!' });
  } catch (error) {
    console.error('Error saving contact message or sending email:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
