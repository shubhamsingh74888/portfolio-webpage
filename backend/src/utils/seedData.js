const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/project');
const Certification = require('../models/certification');

const myProjects = [
  {
    title: 'wanderlust-infra - AWS Infrastructure',
    slug: 'wanderlust-infra',
    description: 'AWS Infrastructure & Incident Troubleshooting with automated cleanup.',
    detailedDescription: 'Provisioned 41 AWS resources via modular Terraform with S3/DynamoDB remote state locking. Diagnosed Terraform destroy failures from orphaned ALBs and built automated cleanup in Jenkins Shared Library. Configured CloudWatch alarms routed to SNS for sub-60-second incident detection.',
    technologies: [{ name: 'Terraform', icon: 'terraform' }, { name: 'AWS', icon: 'aws' }, { name: 'CloudWatch', icon: 'cloudwatch' }],
    tools: ['Jenkins', 'EKS', 'SNS'],
    features: ['Modular IaC', 'Automated incident alerting', 'Runbook documentation'],
    repository: 'https://github.com/shubhamsingh74888/wanderlust-infra',
    category: 'cloud',
    status: 'completed',
    isFeatured: true
  },
  {
    title: 'Wanderlust-Mega-Project - CI/CD & Monitoring',
    slug: 'wanderlust-mega-project',
    description: 'Complete CI/CD Pipeline Operations & Monitoring using GitOps.',
    detailedDescription: 'Diagnosed a CI/CD race condition between GitOps push and ArgoCD sync by refactoring pipelines. Troubleshot ArgoCD OutOfSync failures from immutable StorageClass fields. Integrated SNS alerts into Jenkins post-build hooks and operated SonarQube quality gates and Trivy scanning.',
    technologies: [{ name: 'Kubernetes', icon: 'kubernetes' }, { name: 'ArgoCD', icon: 'argocd' }, { name: 'Jenkins', icon: 'jenkins' }],
    tools: ['Docker', 'Helm', 'SonarQube', 'Trivy', 'Prometheus'],
    features: ['GitOps synchronization', 'SAST/Container scanning', 'Prometheus monitoring'],
    category: 'cicd',
    status: 'completed',
    isFeatured: true
  },
  {
    title: 'stock-price-pipeline',
    slug: 'stock-price-pipeline',
    description: 'Serverless Data Pipeline on AWS using EventBridge and Lambda.',
    detailedDescription: 'Built an event-driven serverless pipeline where EventBridge triggers Lambda to ingest, transform, and store stock price data across S3 and DynamoDB. Converted raw data to Parquet with S3 Intelligent-Tiering, reducing Athena query costs by 90%. Provisioned via Terraform with IAM least-privilege.',
    technologies: [{ name: 'AWS Lambda', icon: 'lambda' }, { name: 'S3', icon: 's3' }, { name: 'DynamoDB', icon: 'dynamodb' }],
    tools: ['EventBridge', 'Athena', 'Terraform'],
    features: ['Serverless architecture', 'Cost optimization', 'IAM least-privilege'],
    category: 'automation',
    status: 'completed',
    isFeatured: true
  },
  {
    title: 'Battery RUL Prediction Pipeline',
    slug: 'battery-rul-prediction',
    description: 'ML model predicting battery remaining useful life from multi-sensor data.',
    detailedDescription: 'Built Battery RUL prediction pipeline on NASA dataset during CSIR-IIP internship. Evaluated 4 ML models via leave-one-battery-out CV. Automated ETL pipelines using Python and Bash, reducing manual data handling effort by 40%.',
    technologies: [{ name: 'Python', icon: 'python' }, { name: 'XGBoost', icon: 'xgboost' }],
    tools: ['Bash', 'Git', 'Pandas', 'scikit-learn'],
    features: ['Automated ETL pipelines', 'Model evaluation', 'Version-controlled environments'],
    category: 'automation',
    status: 'completed',
    isFeatured: true
  }
];

const myCertifications = [
  {
    title: 'CSIR-IIP Technical Internship',
    issuer: 'Council of Scientific & Industrial Research, Govt. of India',
    issueDate: new Date('2026-03-20'),
    image: { url: '/csir-certificate.jpg', alt: 'CSIR-IIP Certificate' },
    skills: ['Machine Learning', 'Python', 'Data Automation', 'Bash Scripting'],
    description: 'Completed project training on "Machine Learning Based Estimation of Battery Remaining Useful Life (RUL) Using Multi-Sensor Degradation Data".',
    category: 'devops',
    level: 'professional'
  },
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2026-07-01'),
    skills: ['AWS Fundamentals', 'Cloud Security', 'Cost Management'],
    description: 'In Progress - Expected completion July 2026.',
    category: 'aws',
    level: 'foundational'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Project.deleteMany({});
    await Certification.deleteMany({});
    
    await Project.insertMany(myProjects);
    await Certification.insertMany(myCertifications);
    
    console.log('Real data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
