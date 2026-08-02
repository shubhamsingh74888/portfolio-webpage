const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/submit', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Save to MongoDB first — always
    const contact = new Contact({
      name,
      email,
      phone: '',
      purpose: 'other',
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    await contact.save();
    console.log('Contact saved to DB:', contact._id);

    // Send emails — non-blocking, failure wont break the response
    const notifyMail = {
      from: `"DevOps Portfolio" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#333;">New Contact Message</h2>
          <div style="background:#f5f5f5;padding:20px;border-radius:5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background:white;padding:15px;border-left:4px solid #007bff;">
              ${message}
            </div>
          </div>
          <p style="color:#666;margin-top:20px;">
            ID: ${contact._id}<br>
            Time: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    const autoReply = {
      from: `"DevOps Portfolio" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#007bff;">Thank You, ${name}!</h2>
          <p>I received your message and will get back to you within 24 hours.</p>
          <div style="background:#f8f9fa;padding:20px;border-radius:5px;margin:20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="color:#666;">${message}</p>
          </div>
          <p>Best regards,<br>Shubham Singh<br>DevOps Engineer</p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
          <p style="color:#999;font-size:12px;">This is an automated response.</p>
        </div>
      `
    };

    // Fire emails async — do not await, never block the response
    Promise.all([
      transporter.sendMail(notifyMail),
      transporter.sendMail(autoReply)
    ]).then(() => {
      console.log('Emails sent successfully');
    }).catch((emailErr) => {
      console.error('Email send failed (non-fatal):', emailErr.message);
    });

    // Always return success once DB save is done
    return res.status(201).json({
      message: 'Thank you! I will get back to you soon.',
      inquiryId: contact._id
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      message: 'Error submitting form. Please try again later.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name email purpose status createdAt');
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
