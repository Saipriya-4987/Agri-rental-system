const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tool",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedSlot: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "slot_assigned", "ready_for_pickup", "in_use", "completed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);