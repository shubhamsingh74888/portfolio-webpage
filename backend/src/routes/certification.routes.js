const express = require("express");
const router = express.Router();
const certController = require("../controllers/certification.controller");

router.get("/", certController.getAllCertifications);
router.post("/", certController.createCertification);

module.exports = router;
