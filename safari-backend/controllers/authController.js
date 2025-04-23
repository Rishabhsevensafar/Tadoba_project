const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const { adminAuth } = require("../middleware/authMiddleware");
const UAParser = require("ua-parser-js"); // Make sure this is installed

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secure-secret";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).populate({
      path: "role",
      populate: { path: "permissions", model: "Permission" },
    });

    if (!admin || !admin.password) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Extract user agent and parse details
    const userAgent = req.headers["user-agent"] || "Unknown";
    const parser = new UAParser(userAgent);

    const browserData = parser.getBrowser();
    const osData = parser.getOS();
    const deviceType = parser.getDevice().type;

    const browser = browserData.name && browserData.version
      ? `${browserData.name} ${browserData.version}`
      : "Unknown";

    const os = osData.name && osData.version
      ? `${osData.name} ${osData.version}`
      : "Unknown";

    const device = deviceType || "Desktop";

    // ✅ Get real IP
    const ip =
      (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0];

    // ✅ Save login log
    admin.loginLogs.push({
      loginAt: new Date(),
      browser,
      os,
      device,
      ip,
    });

    await admin.save();

    const token = jwt.sign({ id: admin._id, role: admin.role.name }, JWT_SECRET, {
      expiresIn: "7h",
    });

    const permissionNames = (admin.role?.permissions || []).map((p) => p.name);

    res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      user: {
        id: admin._id,
        name: admin.name,
        role: admin.role?.name,
        permissions: permissionNames,
      },
    });
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
