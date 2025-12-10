const express = require("express");
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

module.exports = router;