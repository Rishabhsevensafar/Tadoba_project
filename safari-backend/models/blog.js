const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL for blog image
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);
