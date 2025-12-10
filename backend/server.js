require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const projectRoutes = require('./src/routes/project.routes');
const certificationRoutes = require('./src/routes/certification.routes');
const contactRoutes = require('./src/routes/contact.routes');
const blogRoutes = require('./src/routes/blog.routes');
const testimonialRoutes = require('./src/routes/testimonial.routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'DevOps Portfolio API', version: '1.0.0' });
});

// MongoDB connection
let mongoConnected = false;
console.log('Attempting to connect to MongoDB...');
console.log('process.env.MONGODB_URI value:', process.env.MONGODB_URI);
console.log('MONGODB_URI check:', process.env.MONGODB_URI ? 'truthy' : 'falsy');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devops_portfolio';
console.log('Using MongoDB URI:', mongoUri.substring(0, 80) + '...');
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
})
.then(() => {
  mongoConnected = true;
  console.log('✓ MongoDB connected successfully');
})
.catch(err => {
  mongoConnected = false;
  console.error('✗ MongoDB connection error:', err.message);
  console.log('Server will continue to run without database. Database functionality disabled.');
});

console.log('Routes loading...');

// API Routes
// Temporarily commented out for testing
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/certifications', certificationRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/testimonials', testimonialRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoConnected ? 'connected' : 'disconnected',
    api: 'operational'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;
console.log(`Starting server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});