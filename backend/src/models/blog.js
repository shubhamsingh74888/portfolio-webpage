const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: String,
    avatar: String,
    bio: String
  },
  coverImage: {
    url: String,
    alt: String,
    caption: String
  },
  categories: [{
    name: String,
    slug: String
  }],
  tags: [String],
  readingTime: Number,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  featured: {
    type: Boolean,
    default: false
  },
  seoScore: Number
}, {
  timestamps: true
});

// Index for search and filtering
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });
blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ categories: 1 });

module.exports = mongoose.model('Blog', blogSchema);