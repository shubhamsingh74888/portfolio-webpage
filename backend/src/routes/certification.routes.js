const express = require("express");
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

module.exports = router;