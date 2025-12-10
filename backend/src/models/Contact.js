const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['project', 'consultation', 'freelance', 'collaboration', 'other'],
    default: 'project'
  },
  company: String,
  projectType: String,
  budget: String,
  timeline: String,
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    default: 'portfolio'
  },
  attachments: [{
    filename: String,
    path: String,
    size: Number
  }],
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for quick queries
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', contactSchema);