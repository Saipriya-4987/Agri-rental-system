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

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// PUBLIC ROUTES
router.get("/", getAllTools);
router.get("/:id", getToolById);

// PROTECTED ROUTES
router.post("/", protect, authorizeRoles("owner", "admin"), upload.single("image"), createTool);
router.get("/my", protect, authorizeRoles("owner"), getMyTools);
router.put("/:id", protect, authorizeRoles("owner", "admin"), updateTool);
router.delete("/:id", protect, authorizeRoles("owner", "admin"), deleteTool);

module.exports = router;