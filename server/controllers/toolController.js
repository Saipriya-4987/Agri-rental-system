const Tool = require("../models/Tool");

// CREATE TOOL
const createTool = async (req, res) => {
    try {
        const { name, category, description, pricePerDay, address, availableSlots, lat, lng } = req.body;
        
        // Handle file upload
        const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

        const tool = await Tool.create({
            name,
            category,
            description,
            image: imagePath,
            pricePerDay,
            address,
            availableSlots: Array.isArray(availableSlots) ? availableSlots : availableSlots.split(",").map(s => s.trim()),
            location: { lat: parseFloat(lat) || 0, lng: parseFloat(lng) || 0 },
            ownerId: req.user.id
        });
        res.status(201).json(tool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET MY TOOLS (OWNER ONLY)
const getMyTools = async (req, res) => {
    try {
        const tools = await Tool.find({ ownerId: req.user.id });
        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL TOOLS
const getAllTools = async (req, res) => {
    try {
        const tools = await Tool.find();
        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE TOOL
const getToolById = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);

        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        res.json(tool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE TOOL
const updateTool = async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Handle image upload if a new file is provided
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        // Parse location and slots if they are in the body
        if (req.body.lat || req.body.lng) {
            updateData.location = {
                lat: parseFloat(req.body.lat) || 0,
                lng: parseFloat(req.body.lng) || 0
            };
        }

        if (req.body.availableSlots && !Array.isArray(req.body.availableSlots)) {
            updateData.availableSlots = req.body.availableSlots.split(",").map(s => s.trim());
        }

        const tool = await Tool.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        res.json(tool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE TOOL
const deleteTool = async (req, res) => {
    try {
        const tool = await Tool.findByIdAndDelete(req.params.id);

        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        res.json({ message: "Tool deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTool,
    getMyTools,
    getAllTools,
    getToolById,
    updateTool,
    deleteTool
};