const mongoose = require("mongoose");

const pageSEOSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, unique: true }, // e.g., "/about", "/contact", "/blogs/:slug"
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
    noIndex: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PageSEO", pageSEOSchema);
