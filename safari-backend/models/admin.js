const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// ✅ Updated login log schema
const loginSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  browser: { type: String },
  os: { type: String },
  device: { type: String },
  ip: { type: String },
});
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  contactNumber: { type: String },
  avatar: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },  
  dob: { type: Date },
  address: { type: String },
  isActive: { type: Boolean, default: true },
  // 👇 Add this field to track login history
  loginLogs: [loginSchema],
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
