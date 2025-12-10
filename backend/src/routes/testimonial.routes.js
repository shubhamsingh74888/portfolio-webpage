const express = require("express");
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

module.exports = router;