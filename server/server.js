const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load env variables FIRST
dotenv.config();

// DB connection
const connectDB = require("./config/db");

(async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("DB Connection Failed:", err);
        process.exit(1);
    }
})();

// Routes
const authRoutes = require("./routes/authRoutes");
const toolRoutes = require("./routes/toolRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});