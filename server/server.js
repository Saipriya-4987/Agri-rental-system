const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const toolRoutes = require("./routes/toolRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/tools",toolRoutes);
app.use("/api/bookings", bookingRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("API Running...");
});

// Server Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});