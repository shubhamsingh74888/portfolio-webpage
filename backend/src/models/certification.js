const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true
  },
  credentialId: String,
  issueDate: {
    type: Date,
    required: true
  },
  expirationDate: Date,
  credentialUrl: String,
  image: {
    url: String,
    alt: String
  },
  skills: [String],
  description: String,
  verificationCode: String,
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['aws', 'azure', 'gcp', 'kubernetes', 'terraform', 'security', 'devops'],
    default: 'devops'
  },
  level: {
    type: String,
    enum: ['foundational', 'associate', 'professional', 'expert'],
    default: 'associate'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certification', certificationSchema);