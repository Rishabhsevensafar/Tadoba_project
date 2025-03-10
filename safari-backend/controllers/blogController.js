const Blog = require("../models/blog");
const multer = require("multer");

// ✅ Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/blogs/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).single("image");

// ✅ Create a New Blog
exports.createBlog = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "Image upload failed" });

    const { title, content, tags, status } = req.body;
    const imageUrl = req.file ? `/uploads/blogs/${req.file.filename}` : "";

    try {
      const blog = new Blog({
        title,
        content,
        image: imageUrl,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
        status,
        author: req.user.id,
      });

      await blog.save();
      res.status(201).json({ success: true, message: "Blog created successfully", blog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// ✅ Get All Published Blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // ✅ Fetch all blogs
        res.status(200).json({ success: true, blogs });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
};

// ✅ Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
