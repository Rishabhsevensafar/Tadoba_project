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
  const { email, name, contactNumber, dob, address } = req.body;
  const updates = { email, name, contactNumber, dob, address };

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

router.post("/create-user", adminAuth, async (req, res) => {
  const { email, password, role = "sales", permissions=[] } = req.body;

  // ✅ Only admin can create another admin
  if (role === "admin" && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Only admins can create other admins." });
  }

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (role === "admin" && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Only admins can create other admins." });
  }
  // ✅ Allow custom roles  

  const existing = await Admin.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new Admin({ email, password, role, permissions });
  await newUser.save();

  res.json({ success: true, message: `${role.toUpperCase()} user created`, user: newUser });
});
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await Admin.find({}, "email role isActive createdAt dob address permissions");// ✅ include isActive
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
// ✅ Update user (email or role)
router.put("/user/:id", adminAuth, async (req, res) => {
  const { email, role, permissions=[] } = req.body;
  const user = await Admin.findByIdAndUpdate(req.params.id, { email, role, permissions }, { new: true });
  res.json({ success: true, user });
});

// ✅ Toggle active status
router.put("/user/:id/toggle", adminAuth, async (req, res) => {
  const user = await Admin.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isActive = !user.isActive;
  await user.save();

  res.json({ success: true, message: "Status updated", user });
});

// ✅ Delete user
router.delete("/user/:id", adminAuth, async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "User deleted" });
});

module.exports = router;