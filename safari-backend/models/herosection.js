const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
