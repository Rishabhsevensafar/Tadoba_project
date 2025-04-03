const express = require("express");
const { createBlog, getBlogs, updateBlog, deleteBlog, getBlogsAdmin,getBlogById } = require("../controllers/blogController");
const { adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", adminAuth, createBlog);
router.get("/", getBlogs);
router.put("/:id", adminAuth, updateBlog);
router.delete("/:id", adminAuth, deleteBlog);
router.get("/admin/", getBlogsAdmin);
router.get('/blogs/:id', getBlogById);

module.exports = router;
