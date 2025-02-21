const express = require("express");
const {
  createTourPackage,
  getAllTourPackages,
  getTourPackageById,
  updateTourPackage,
  deleteTourPackage,
  togglePackageStatus,
} = require("../controllers/packageController");

const router = express.Router();
const multer = require("multer");

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/packages"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Define Routes
router.post("/create", upload.array("images"), createTourPackage);
router.get("/", getAllTourPackages);
router.get("/:id", getTourPackageById);
router.put("/:id", upload.array("images"), updateTourPackage);
router.delete("/:id", deleteTourPackage);
router.put("/:id/status", togglePackageStatus);

module.exports = router;
