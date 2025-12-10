const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Certification = require('../models/certification');
const Blog = require('../models/blog');
const Testimonial = require('../models/testimonial');
const Contact = require('../models/contact');

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin' && req.admin.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Dashboard statistics
router.get('/dashboard/stats', auth, requireAdmin, async (req, res) => {
  try {
    const [
      projectsCount,
      certificationsCount,
      blogsCount,
      testimonialsCount,
      newContactsCount,
      totalViews,
      totalLikes
    ] = await Promise.all([
      Project.countDocuments(),
      Certification.countDocuments(),
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }])
    ]);

    res.json({
      stats: {
        projects: projectsCount,
        certifications: certificationsCount,
        blogs: blogsCount,
        testimonials: testimonialsCount,
        newContacts: newContactsCount,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Project management
router.get('/projects', auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Project.countDocuments(query)
    ]);

    res.json({
      projects,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/projects', auth, requireAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.put('/projects/:id', auth, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.delete('/projects/:id', auth, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Certification management
router.get('/certifications', auth, requireAdmin, async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 });
    res.json(certifications);
  } catch (error) {
    console.error('Get certifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/certifications', auth, requireAdmin, async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    console.error('Create certification error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Blog management
router.get('/blogs', auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const query = status ? { isPublished: status === 'published' } : {};

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-content -__v'),
      Blog.countDocuments(query)
    ]);

    res.json({
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/blogs', auth, requireAdmin, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.put('/blogs/:id', auth, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Contact inquiries
router.get('/contacts', auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip = (page - 1) * limit;

    const query = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(query)
    ]);

    res.json({
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/contacts/:id/status', auth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;