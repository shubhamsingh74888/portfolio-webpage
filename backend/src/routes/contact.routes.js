const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');
const { body, validationResult } = require('express-validator');

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Submit contact form
router.post('/submit', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('purpose').isIn(['project', 'consultation', 'freelance', 'collaboration', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, purpose, company, projectType, budget, timeline, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      phone,
      purpose,
      company,
      projectType,
      budget,
      timeline,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notification
    const mailOptions = {
      from: `"DevOps Portfolio" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Inquiry: ${purpose}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Inquiry Received</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff;">
              ${message}
            </div>
          </div>
          <p style="margin-top: 20px; color: #666;">
            Inquiry ID: ${contact._id}<br>
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    // Send auto-reply to user
    const autoReplyOptions = {
      from: `"DevOps Portfolio" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your inquiry about <strong>${purpose}</strong> and I'll get back to you within 24 hours.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="color: #666;">${message}</p>
          </div>
          <p>In the meantime, you can:</p>
          <ul>
            <li>Check out my portfolio for more projects</li>
            <li>Read my blog for DevOps insights</li>
            <li>Download my CV for detailed experience</li>
          </ul>
          <p>Best regards,<br>
          DevOps Engineer</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    res.status(201).json({
      message: 'Thank you for your message! I will get back to you soon.',
      inquiryId: contact._id
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      message: 'Error submitting form. Please try again later.' 
    });
  }
});

// Get contact inquiries (public endpoint for admin panel)
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