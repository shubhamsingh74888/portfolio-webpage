const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/project');
const Certification = require('../models/certification');
const Admin = require('../models/admin');
const Testimonial = require('../models/testimonial');
const { generateSlug } = require('./helpers');

const seedProjects = [
  {
    title: 'Multi-Cloud E-commerce Platform',
    slug: 'multi-cloud-ecommerce-platform',
    description: 'Scalable e-commerce platform deployed across AWS, Azure, and GCP',
    detailedDescription: 'A highly available e-commerce platform with microservices architecture deployed across multiple cloud providers. Implemented auto-scaling, load balancing, and disaster recovery strategies.',
    technologies: [
      { name: 'AWS', icon: 'aws' },
      { name: 'Azure', icon: 'azure' },
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Terraform', icon: 'terraform' }
    ],
    tools: ['Docker', 'Helm', 'Jenkins', 'Prometheus', 'Grafana'],
    features: ['Multi-cloud deployment', 'Auto-scaling', 'CI/CD Pipeline', 'Real-time monitoring'],
    challenges: ['Cross-cloud networking', 'Data consistency', 'Cost optimization'],
    solutions: ['Implemented service mesh', 'Used eventual consistency', 'Cost monitoring dashboard'],
    architecture: 'microservices',
    deployment: {
      platform: 'AWS EKS + AKS + GKE',
      method: 'GitOps with ArgoCD',
      url: 'https://demo-ecommerce.example.com'
    },
    repository: 'https://github.com/username/ecommerce-platform',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        alt: 'E-commerce Architecture',
        caption: 'Multi-cloud deployment architecture'
      }
    ],
    category: 'cloud',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-06-30')
    },
    metrics: {
      deploymentFrequency: '50/day',
      leadTime: '2 hours',
      changeFailureRate: '2%',
      mttr: '15 minutes'
    },
    isFeatured: true
  },
  {
    title: 'DevSecOps Pipeline Implementation',
    slug: 'devsecops-pipeline-implementation',
    description: 'Complete DevSecOps pipeline with security scanning and compliance',
    detailedDescription: 'Implemented a comprehensive DevSecOps pipeline integrating security scanning, secret detection, vulnerability assessment, and compliance checks at every stage of the CI/CD process.',
    technologies: [
      { name: 'GitLab CI', icon: 'gitlab' },
      { name: 'SonarQube', icon: 'sonarqube' },
      { name: 'Trivy', icon: 'trivy' },
      { name: 'Aqua Security', icon: 'aqua' }
    ],
    tools: ['Docker', 'Kubernetes', 'Hashicorp Vault', 'OWASP ZAP'],
    features: ['SAST/DAST integration', 'Secret scanning', 'Container security', 'Compliance automation'],
    category: 'security',
    isFeatured: true
  }
];

const seedCertifications = [
  {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    credentialId: 'AWS123456',
    issueDate: new Date('2023-03-15'),
    expirationDate: new Date('2026-03-15'),
    credentialUrl: 'https://aws.amazon.com/certification',
    image: {
      url: '/certificates/aws-saa.png',
      alt: 'AWS Solutions Architect Associate Certification'
    },
    skills: ['AWS Architecture', 'Cloud Migration', 'Cost Optimization'],
    description: 'Demonstrates ability to design and deploy scalable systems on AWS',
    category: 'aws',
    level: 'associate'
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    credentialId: 'CKA-2023-00123',
    issueDate: new Date('2023-05-20'),
    credentialUrl: 'https://www.cncf.io/certification/cka/',
    image: {
      url: '/certificates/cka.png',
      alt: 'Certified Kubernetes Administrator'
    },
    skills: ['Kubernetes', 'Container Orchestration', 'Cluster Management'],
    description: 'Validates skills in Kubernetes administration and cluster operations',
    category: 'kubernetes',
    level: 'professional'
  }
];

const seedTestimonials = [
  {
    clientName: 'Sarah Johnson',
    clientCompany: 'TechCorp Inc.',
    clientRole: 'CTO',
    clientAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    project: 'Cloud Migration Project',
    rating: 5,
    testimonial: 'Exceptional work on our cloud migration! The DevOps implementation reduced our deployment time by 70% and improved system reliability significantly.',
    featured: true,
    verification: {
      verified: true,
      verifiedAt: new Date('2023-10-15')
    }
  },
  {
    clientName: 'Michael Chen',
    clientCompany: 'FinTech Solutions',
    clientRole: 'Lead Developer',
    clientAvatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    project: 'Kubernetes Cluster Setup',
    rating: 5,
    testimonial: 'The Kubernetes implementation was flawless. Our application performance improved by 40% and scaling is now completely automated.',
    featured: true
  }
];

const seedAdmin = {
  username: 'admin',
  email: 'admin@devopsportfolio.com',
  password: 'Admin@1234',
  role: 'superadmin',
  profile: {
    name: 'DevOps Admin',
    bio: 'System Administrator'
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Project.deleteMany({});
    await Certification.deleteMany({});
    await Testimonial.deleteMany({});
    await Admin.deleteMany({});

    // Seed data
    await Project.insertMany(seedProjects);
    console.log('Projects seeded successfully');

    await Certification.insertMany(seedCertifications);
    console.log('Certifications seeded successfully');

    await Testimonial.insertMany(seedTestimonials);
    console.log('Testimonials seeded successfully');

    // Create admin
    const admin = new Admin(seedAdmin);
    await admin.save();
    console.log('Admin user created successfully');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };