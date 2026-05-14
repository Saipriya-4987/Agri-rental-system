const express = require("express");
const router = express.Router();

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    getOwnerBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

// Routes
router.post("/", protect, authorizeRoles("user", "admin"), createBooking);
router.get("/user", protect, authorizeRoles("user", "admin"), getMyBookings);
router.get("/owner", protect, authorizeRoles("owner", "admin"), getOwnerBookings);
router.patch("/:id/status", protect, authorizeRoles("owner", "admin"), updateBookingStatus);

// Admin only: view all bookings
const Booking = require("../models/Booking");
router.get("/all", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const bookings = await Booking.find().populate("tool user owner");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;