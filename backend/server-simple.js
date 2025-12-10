require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Use only the simple route
const simpleRoutes = require("./src/routes/simple.routes");
app.use("/api/simple", simpleRoutes);

app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working!" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`?? Server running on port ${PORT}`);
});
