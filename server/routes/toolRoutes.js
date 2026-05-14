const express = require("express");
const router = express.Router();

const {
    createTool,
    getMyTools,
    getAllTools,
    getToolById,
    updateTool,
    deleteTool
} = require("../controllers/toolController");

const { protect } = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

// Upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/* ======================
   PUBLIC ROUTES
====================== */
router.get("/", getAllTools);
router.get("/:id", getToolById);

/* ======================
   PROTECTED ROUTES
====================== */

// CREATE TOOL
router.post("/", protect, upload.single("image"), createTool);

// MY TOOLS
router.get("/my", protect, getMyTools);

// UPDATE TOOL
router.put("/:id", protect, upload.single("image"), updateTool);

// DELETE TOOL
router.delete("/:id", protect, deleteTool);

module.exports = router;