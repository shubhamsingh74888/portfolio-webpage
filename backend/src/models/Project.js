const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    required: true
  },
  technologies: [{
    name: String,
    icon: String
  }],
  tools: [String],
  features: [String],
  challenges: [String],
  solutions: [String],
  architecture: {
    type: String,
    enum: ['microservices', 'monolithic', 'serverless', 'hybrid']
  },
  deployment: {
    platform: String,
    method: String,
    url: String
  },
  repository: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?(www\.)?github\.com\/.+/i.test(v) || v === '';
      },
      message: props => `${props.value} is not a valid GitHub URL!`
    }
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  category: {
    type: String,
    enum: ['devops', 'cloud', 'cicd', 'monitoring', 'automation', 'security'],
    default: 'devops'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  timeline: {
    startDate: Date,
    endDate: Date
  },
  metrics: {
    deploymentFrequency: String,
    leadTime: String,
    changeFailureRate: String,
    mttr: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

module.exports = mongoose.model('Project', projectSchema);