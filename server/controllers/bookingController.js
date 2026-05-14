const Booking = require("../models/Booking");
const Tool = require("../models/Tool");

// ============================
// CREATE BOOKING
// ============================
exports.createBooking = async (req, res) => {
    try {
        const { toolId, selectedSlot } = req.body;

        // 1. Check tool exists
        const tool = await Tool.findById(toolId);
        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        // 2. Check if slot already booked
        const existingBooking = await Booking.findOne({
            tool: toolId,
            selectedSlot,
            status: { $nin: ["rejected", "cancelled"] }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This slot is already booked"
            });
        }

        // 3. Price is per day/slot
        const totalPrice = tool.pricePerDay;

        // 4. Create booking
        const booking = await Booking.create({
            tool: toolId,
            user: req.user.id,
            owner: tool.ownerId,
            selectedSlot,
            totalPrice
        });

        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============================
// GET USER BOOKINGS
// ============================
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("tool")
            .populate("owner", "name email");

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============================
// GET OWNER BOOKINGS
// ============================
exports.getOwnerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ owner: req.user.id })
            .populate("tool")
            .populate("user", "name email");

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============================
// UPDATE BOOKING STATUS (ACCEPT/REJECT)
// ============================
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check if the user is the owner of the tool
        if (booking.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this booking" });
        }

        booking.status = status;
        await booking.save();

        res.json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};