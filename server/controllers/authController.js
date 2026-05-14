const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
    try {
        console.log("REGISTER BODY:", req.body); // DEBUG LINE

        const { name, email, password, role } = req.body;

        // check missing fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


// LOGIN
const loginUser = async (req, res) => {
    try {
        console.log("LOGIN BODY:", req.body); // DEBUG LINE

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


// RESET PASSWORD
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully! Please login with your new password." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, resetPassword };