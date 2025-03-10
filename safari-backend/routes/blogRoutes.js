const express = require("express");
const { createBlog, getBlogs, updateBlog, deleteBlog } = require("../controllers/blogController");
const { adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", adminAuth, createBlog);
router.get("/", getBlogs);
router.put("/:id", adminAuth, updateBlog);
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;
