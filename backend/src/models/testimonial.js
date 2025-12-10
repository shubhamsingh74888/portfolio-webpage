const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  clientCompany: String,
  clientRole: String,
  clientAvatar: String,
  project: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  testimonial: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  verification: {
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: mongoose.Schema.Types.ObjectId
  },
  socialProof: {
    linkedin: String,
    twitter: String,
    website: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);