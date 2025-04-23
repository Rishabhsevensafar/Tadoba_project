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
const path = require("path");
const fs = require("fs");

// ✅ Directories for uploads
const packageDir = path.join(__dirname, '../uploads/packages');
const itineraryDir = path.join(__dirname, '../uploads/itinerary');

// ✅ Ensure directories exist
[packageDir, itineraryDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ✅ Storage logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "itineraryImages") {
      cb(null, itineraryDir);
    } else {
      cb(null, packageDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .png, and .webp formats are allowed'), false);
  }
};

// ✅ Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per file
  }
});

// ✅ Multer error handler
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File size too large. Maximum 5MB allowed.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, error: 'Too many files uploaded.' });
    }
  } else if (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next();
};

// ✅ Routes
router.route("/")
  .get(getAllTourPackages)
  .post(
    upload.fields([
      { name: "images", maxCount: 5 },
      { name: "itineraryImages", maxCount: 10 }
    ]),
    handleMulterErrors,
    createTourPackage
  );

router.route("/:id")
  .get(getTourPackageById)
  .put(
    upload.fields([
      { name: "images", maxCount: 5 },
      { name: "itineraryImages", maxCount: 10 }
    ]),
    handleMulterErrors,
    updateTourPackage
  )
  .delete(deleteTourPackage);

router.put("/:id/status", togglePackageStatus);

module.exports = router;
