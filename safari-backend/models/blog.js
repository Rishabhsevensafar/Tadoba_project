const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" }
}, { 
  timestamps: true // This automatically adds and manages createdAt and updatedAt
});

module.exports = mongoose.model("Blog", blogSchema);
