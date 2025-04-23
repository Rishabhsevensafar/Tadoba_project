const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const Role = require("../models/Role");
const { adminAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// ✅ Multer for avatar upload
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

// ✅ Get Profile
router.get("/profile", adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
      .select("-password")
      .populate({
        path: "role",
        populate: { path: "permissions", model: "Permission" },
      });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Profile
router.put("/profile", adminAuth, upload.single("avatar"), async (req, res) => {
  try {
    const { email, name, contactNumber, dob, address } = req.body;
    const updates = { email, name, contactNumber, dob, address };

    if (req.file) {
      updates.avatar = `/uploads/admin/avatar/${req.file.filename}`;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json({ success: true, admin: updatedAdmin });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/change-password", adminAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("Password Change Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Create New Admin
router.post("/create-user", adminAuth, async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const roleExists = await Role.findById(role);
    if (!roleExists) return res.status(400).json({ message: "Invalid role" });

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const newUser = new Admin({ email, password, role });
    await newUser.save();

    const populated = await Admin.findById(newUser._id).populate("role", "name");

    res.json({ success: true, user: populated });
  } catch (err) {
    console.error("Create User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get All Users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await Admin.find()
      .select("email role isActive createdAt dob address name contactNumber")
      .populate({
        path: "role",
        populate: { path: "permissions", model: "Permission" },
      });

    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.put("/user/:id", adminAuth, async (req, res) => {
  try {
    const { email, role, password, name, contactNumber } = req.body;

    if (role) {
      const roleExists = await Role.findById(role);
      if (!roleExists) {
        return res.status(400).json({ message: "Invalid role" });
      }
    }

    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = password; // ✅ Let pre-save hook hash it
    if (name) user.name = name;
    if (contactNumber) user.contactNumber = contactNumber;

    await user.save();

    const updated = await Admin.findById(user._id).populate("role", "name");
    res.json({ success: true, user: updated });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Toggle User Active Status
router.put("/user/:id/toggle", adminAuth, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    const updated = await Admin.findById(user._id).populate("role", "name");
    res.json({ success: true, user: updated });
  } catch (err) {
    console.error("Toggle Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete User
router.delete("/user/:id", adminAuth, async (req, res) => {
  try {
    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ GET login logs for a user
router.get("/login-logs/:id", adminAuth, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id).select("email loginLogs name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sort by most recent login
    const sortedLogs = (user.loginLogs || []).sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    res.json({ logs: sortedLogs });
  } catch (err) {
    console.error("Login logs fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
