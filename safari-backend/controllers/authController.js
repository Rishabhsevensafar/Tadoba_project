const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const { adminAuth } = require("../middleware/authMiddleware")
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secure-secret";

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    console.log("Admin role in DB:", admin.role);

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: admin._id, role: admin.role}, JWT_SECRET, { expiresIn: "7h" });

    res.status(200).json({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Logout (Handled on frontend by clearing token)
router.post("/logout", (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
});

// ✅ Protected Admin Route Example (Requires Token)
router.get("/dashboard", adminAuth, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Admin Dashboard", admin: req.admin });
});

module.exports = router;
