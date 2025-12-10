const express = require("express");
const app = express();

app.use(express.json());

console.log("Testing all route files...\n");

const testRouteFile = (name, path, endpoint) => {
    console.log(`Testing ${name}...`);
    
    try {
        // Clear require cache
        delete require.cache[require.resolve(path)];
        
        const route = require(path);
        
        // Mount the route
        app.use(endpoint, route);
        console.log(`  ✅ Mounted successfully`);
        
        // Test if it has GET handler for root
        const routeStack = route.stack || [];
        const hasGetHandler = routeStack.some(layer => {
            return layer.route && 
                   layer.route.methods.get && 
                   layer.route.path === "/";
        });
        
        console.log(`  ${hasGetHandler ? "✅" : "❌"} Has GET / handler`);
        
        if (!hasGetHandler) {
            console.log(`  Available routes:`);
            routeStack.forEach(layer => {
                if (layer.route) {
                    const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(", ");
                    console.log(`    ${methods} ${layer.route.path}`);
                }
            });
        }
        
    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
    }
    
    console.log("");
};

// Test all routes
const routes = [
    ["auth.routes.js", "./src/routes/auth.routes", "/api/auth"],
    ["admin.routes.js", "./src/routes/admin.routes", "/api/admin"],
    ["project.routes.js", "./src/routes/project.routes", "/api/projects"],
    ["certification.routes.js", "./src/routes/certification.routes", "/api/certifications"],
    ["contact.routes.js", "./src/routes/contact.routes", "/api/contact"],
    ["blog.routes.js", "./src/routes/blog.routes", "/api/blogs"],
    ["testimonial.routes.js", "./src/routes/testimonial.routes", "/api/testimonials"]
];

routes.forEach(([name, path, endpoint]) => {
    testRouteFile(name, path, endpoint);
});

// Start a test server
const PORT = 5002;
app.get("/test", (req, res) => {
    res.json({ message: "Test server working" });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Test server running on port ${PORT}`);
    console.log(`🔗 Test: http://localhost:${PORT}/test`);
    console.log(`🔗 Projects: http://localhost:${PORT}/api/projects`);
});
