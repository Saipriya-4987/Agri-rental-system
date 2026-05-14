const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    location: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    address: {
        type: String,
        required: true
    },
    availableSlots: [{
        type: String
    }],
    availability: {
        type: Boolean,
        default: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Tool", toolSchema);