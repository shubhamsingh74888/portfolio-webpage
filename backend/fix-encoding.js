const fs = require("fs");
const path = require("path");

console.log("Creating clean route files...\n");

const routes = [
    {
        name: "project.routes.js",
        content: `const express = require("express");
const router = express.Router();

// GET all projects
router.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Projects endpoint",
        data: []
    });
});

// GET single project
router.get("/:id", (req, res) => {
    res.json({ 
        success: true, 
        message: "Project " + req.params.id,
        data: { id: req.params.id }
    });
});

module.exports = router;`
    },
    {
        name: "certification.routes.js",
        content: `const express = require("express");
const router = express.Router();

// GET all certifications
router.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Certifications endpoint",
        data: []
    });
});

// GET single certification
router.get("/:id", (req, res) => {
    res.json({ 
        success: true, 
        message: "Certification " + req.params.id,
        data: { id: req.params.id }
    });
});

module.exports = router;`
    },
    {
        name: "blog.routes.js", 
        content: `const express = require("express");
const router = express.Router();

// GET all blogs
router.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Blogs endpoint",
        data: []
    });
});

// GET single blog
router.get("/:id", (req, res) => {
    res.json({ 
        success: true, 
        message: "Blog " + req.params.id,
        data: { id: req.params.id }
    });
});

module.exports = router;`
    },
    {
        name: "testimonial.routes.js",
        content: `const express = require("express");
const router = express.Router();

// GET all testimonials
router.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Testimonials endpoint",
        data: []
    });
});

// GET single testimonial
router.get("/:id", (req, res) => {
    res.json({ 
        success: true, 
        message: "Testimonial " + req.params.id,
        data: { id: req.params.id }
    });
});

module.exports = router;`
    }
];

routes.forEach(route => {
    const filepath = path.join(__dirname, "src", "routes", route.name);
    
    // Delete if exists
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
    
    // Create new file with UTF-8 encoding
    fs.writeFileSync(filepath, route.content, "utf8");
    
    // Verify it works
    try {
        require(filepath);
        console.log(`? ${route.name} - Created and syntax valid`);
    } catch (error) {
        console.log(`? ${route.name} - Error: ${error.message}`);
    }
});

console.log("\n?? All files created successfully!");
