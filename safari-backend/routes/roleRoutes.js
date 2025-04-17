const express = require("express");
const router = express.Router();
const Role = require("../models/Role");
const Admin = require("../models/admin");
const Permission = require("../models/permission");
const { adminAuth } = require("../middleware/authMiddleware");

// ✅ Create New Role
router.post("/", adminAuth, async (req, res) => {
  try {
    const { name, description } = req.body;

    // If "admin" role is being created, assign all permissions automatically
    if (name.toLowerCase() === "admin") {
      const allPermissions = await Permission.find();
      const role = new Role({
        name,
        description,
        permissions: allPermissions.map((p) => p._id),
      });
      await role.save();
      return res.status(201).json(role);
    }

    const role = new Role({ name, description });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    console.error("Create Role Error:", err);
    res.status(500).json({ message: "Server error while creating role" });
  }
});

// ✅ Get All Roles with Permissions Populated
router.get("/", adminAuth, async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 }).populate("permissions");
    res.json(roles);
  } catch (err) {
    console.error("Get Roles Error:", err);
    res.status(500).json({ message: "Server error while fetching roles" });
  }
});

// ✅ Update Role Details (name/description only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (err) {
    console.error("Update Role Error:", err);
    res.status(500).json({ message: "Server error while updating role" });
  }
});

// ✅ Delete Role (only if not assigned to any user)
router.delete("/:id", adminAuth, async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      // Prevent deletion of admin role
      if (role.name.toLowerCase() === "admin") {
        return res.status(400).json({
          message: "Cannot delete admin role",
        });
      }
  
      // Check if any admin is using this role
      const adminCount = await Admin.countDocuments({ role: role._id });
      if (adminCount > 0) {
        return res.status(400).json({
          message: "Cannot delete role assigned to users",
        });
      }
  
      // Use deleteOne() instead of remove()
      await Role.deleteOne({ _id: role._id });
      
      res.json({ 
        success: true,
        message: "Role deleted successfully" 
      });
    } catch (err) {
      console.error("Delete Role Error:", err);
      res.status(500).json({ 
        success: false,
        message: "Server error while deleting role",
        error: err.message 
      });
    }
  });

// ✅ Assign Permissions to Role
router.put("/:id/permissions", adminAuth, async (req, res) => {
  try {
    const { permissions } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({
      message: "Permissions updated successfully",
      role,
    });
  } catch (err) {
    console.error("Assign Permissions Error:", err);
    res.status(500).json({ message: "Server error while assigning permissions" });
  }
});

module.exports = router;
