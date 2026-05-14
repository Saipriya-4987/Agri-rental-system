const express = require("express");
const router = express.Router();

const { registerUser, loginUser, resetPassword } = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);

// Admin only: view all users
const User = require("../models/User");
router.get("/users", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;