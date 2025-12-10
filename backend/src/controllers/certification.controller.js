const Certification = require('../models/certification');

exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({ isActive: true })
      .sort({ issueDate: -1 });

    res.json({ success: true, count: certifications.length, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCertification = async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};