const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  contactNumber: { type: String },
  avatar: { type: String },
  role: {
    type: String,
  },
  dob: { type: Date },
  address: { type: String },
  permissions: [{ type: String }], // e.g., ['dashboard', 'blogs', 'bookings']
  isActive: { type: Boolean, default: true },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
