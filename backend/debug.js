// debug.js
const path = require('path');

console.log('Checking route exports...\n');

const routes = [
  { name: 'authRoutes', path: './src/routes/auth.routes' },
  { name: 'adminRoutes', path: './src/routes/admin.routes' },
  { name: 'projectRoutes', path: './src/routes/project.routes' },
  { name: 'certificationRoutes', path: './src/routes/certification.routes' },
  { name: 'contactRoutes', path: './src/routes/contact.routes' },
  { name: 'blogRoutes', path: './src/routes/blog.routes' },
  { name: 'testimonialRoutes', path: './src/routes/testimonial.routes' }
];

routes.forEach(route => {
  try {
    // Clear require cache to get fresh import
    delete require.cache[require.resolve(route.path)];
    
    const imported = require(route.path);
    
    console.log(`${route.name} (${route.path}):`);
    console.log(`  Type: ${typeof imported}`);
    console.log(`  Constructor: ${imported?.constructor?.name || 'undefined'}`);
    console.log(`  Is Router: ${imported?.constructor?.name === 'Router' ? '✅' : '❌'}`);
    
    // Check if it's an object with a router property
    if (typeof imported === 'object' && imported.router) {
      console.log(`  Has .router property: ✅ (This might be the issue!)`);
    }
    
    console.log('---');
  } catch (error) {
    console.log(`${route.name}: ❌ Error - ${error.message}`);
    console.log('---');
  }
});
