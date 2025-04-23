const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Banner = require("../models/herosection");

// Set up multer inside controller file
const storage = multer.memoryStorage(); // direct memory, we'll write manually to disk
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only JPEG, JPG, PNG files are allowed"));
  },
}).array("images", 5); // max 5 images at once

exports.uploadBannerImages = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    try {
      const bannerDir = path.join(__dirname, "..", "uploads", "banner");
      if (!fs.existsSync(bannerDir)) {
        fs.mkdirSync(bannerDir, { recursive: true });
      }

      const imagePaths = req.files.map((file) => {
        const filename = `${Date.now()}-${file.originalname}`;
        const filepath = path.join(bannerDir, filename);
        fs.writeFileSync(filepath, file.buffer);
        return `/uploads/banner/${filename}`;
      });

      const banner = await Banner.findOneAndUpdate(
        {},
        { images: imagePaths },
        { upsert: true, new: true }
      );

      res.status(200).json({ success: true, banner });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });
};

// ✅ Get banner images
exports.getBannerImages = async (req, res) => {
  try {
    const banner = await Banner.findOne();
    res.status(200).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch banner" });
  }
};
