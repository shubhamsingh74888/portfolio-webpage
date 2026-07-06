require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const myProjects = [
  {
    title: 'Battery Remaining Useful Life (RUL) Prediction',
    slug: 'battery-rul-prediction',
    description: "ML model predicting a lithium-ion battery's remaining useful life from voltage/current cycling data.",
    detailedDescription: 'Built and compared regression models (Random Forest, Gradient Boosting, SVR, etc.) on battery cycling data to estimate remaining charge cycles, supporting predictive maintenance decisions.',
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'scikit-learn', icon: 'sklearn' },
      { name: 'Pandas', icon: 'pandas' }
    ],
    tools: ['Jupyter', 'NumPy', 'Matplotlib'],
    features: [
      'Feature engineering from voltage/current curves',
      'Multiple regression models compared',
      'RUL forecasting'
    ],
    repository: 'https://github.com/shubhamsingh74888/battery_RUL_prediction',
    category: 'automation',
    status: 'completed',
    isFeatured: true
  }
  // add more project objects here, comma-separated
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const p of myProjects) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    console.log(`Upserted: ${p.title}`);
  }

  console.log('Done.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
