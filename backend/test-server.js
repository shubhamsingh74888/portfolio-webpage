require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Test route working!" });
});

// Try mounting routes one by one
console.log("Mounting routes...\n");

try {
    const authRoutes = require("./src/routes/auth.routes");
    app.use("/api/auth", authRoutes);
    console.log("✅ authRoutes mounted");
} catch (error) {
    console.log("❌ authRoutes error:", error.message);
}

try {
    const adminRoutes = require("./src/routes/admin.routes");
    app.use("/api/admin", adminRoutes);
    console.log("✅ adminRoutes mounted");
} catch (error) {
    console.log("❌ adminRoutes error:", error.message);
}

try {
    const contactRoutes = require("./src/routes/contact.routes");
    app.use("/api/contact", contactRoutes);
    console.log("✅ contactRoutes mounted");
} catch (error) {
    console.log("❌ contactRoutes error:", error.message);
}

// Test the fixed routes
try {
    const projectRoutes = require("./src/routes/project.routes");
    app.use("/api/projects", projectRoutes);
    console.log("✅ projectRoutes mounted");
} catch (error) {
    console.log("❌ projectRoutes error:", error.message);
}

try {
    const certificationRoutes = require("./src/routes/certification.routes");
    app.use("/api/certifications", certificationRoutes);
    console.log("✅ certificationRoutes mounted");
} catch (error) {
    console.log("❌ certificationRoutes error:", error.message);
}

try {
    const blogRoutes = require("./src/routes/blog.routes");
    app.use("/api/blogs", blogRoutes);
    console.log("✅ blogRoutes mounted");
} catch (error) {
    console.log("❌ blogRoutes error:", error.message);
}

try {
    const testimonialRoutes = require("./src/routes/testimonial.routes");
    app.use("/api/testimonials", testimonialRoutes);
    console.log("✅ testimonialRoutes mounted");
} catch (error) {
    console.log("❌ testimonialRoutes error:", error.message);
}

const PORT = process.env.PORT || 5001; // Use different port
app.listen(PORT, () => {
    console.log(`\n🚀 Test server running on port ${PORT}`);
    console.log(`🔗 Test: http://localhost:${PORT}/api/test`);
    console.log(`🔗 Auth: http://localhost:${PORT}/api/auth`);
});
