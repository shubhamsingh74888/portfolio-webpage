const express = require("express");
const router = express.Router();

// GET /api/projects - Get all projects
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Projects endpoint",
        data: [
            { id: 1, name: "Project 1", description: "First project" },
            { id: 2, name: "Project 2", description: "Second project" }
        ]
    });
});

// GET /api/projects/:id - Get single project
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        message: "Project " + req.params.id,
        data: {
            id: req.params.id,
            name: "Sample Project",
            description: "This is a sample project",
            technologies: ["Node.js", "Express", "MongoDB"]
        }
    });
});

// POST /api/projects - Create new project
router.post("/", (req, res) => {
    res.json({
        success: true,
        message: "Project created",
        data: req.body
    });
});

module.exports = router;
