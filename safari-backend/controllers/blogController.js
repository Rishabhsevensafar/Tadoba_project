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

    const { title, content, tags, status, metaTitle, metaDescription } = req.body;
    const imageUrl = req.file ? `/uploads/blogs/${req.file.filename}` : "";

    try {
      const blog = new Blog({
        title,
        content,
        image: imageUrl,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
        status,
        metaTitle, 
        metaDescription,
        author: req.user.id,
      });

      await blog.save();
      res.status(201).json({ success: true, message: "Blog created successfully", blog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "name");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // Prevent caching
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Published Blogs
exports.getBlogsAdmin = async (req, res) => {
  try {
      const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "name"); // ✅ Fetch all blogs
      res.status(200).json({ success: true, blogs });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");;
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "Image upload failed" });

    const { title, content, tags, status, metaTitle, metaDescription } = req.body;
    const imageUrl = req.file ? `/uploads/blogs/${req.file.filename}` : req.body.image;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          image: imageUrl,
          tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
          status,
          metaTitle, 
          metaDescription
        },
        { new: true } // Return the updated document
      );

      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }

      res.status(200).json({ success: true, message: "Blog updated successfully", updatedBlog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
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
