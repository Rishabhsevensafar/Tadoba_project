const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const { adminAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secure-secret";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/admin/avatar");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});
const upload = multer({ storage });

router.get("/profile", adminAuth, async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  res.json(admin);
});

router.put("/profile", adminAuth, upload.single("avatar"), async (req, res) => {
  const { email, name, contactNumber } = req.body;
  const updates = { email, name, contactNumber };

  if (req.file) {
    updates.avatar = `/uploads/admin/avatar/${req.file.filename}`;
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
  res.json({ success: true, admin: updatedAdmin });
});

// ✅ Change Password
router.put("/change-password", adminAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.user.id);
  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  admin.password = newPassword; 
  await admin.save();

  res.json({ success: true, message: "Password updated successfully" });
});
module.exports = router;