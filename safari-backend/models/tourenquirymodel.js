const mongoose = require("mongoose");
const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Not Interested', 'No Response'],
    required: true
  },
  remark: String,
  changedAt: {
    type: Date,
    default: Date.now
  }
});

const tourEnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: String,
  message: String,
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "HotelPackage" },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage" },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Not Interested', 'No Response'],
    default: 'Pending'
  },
  remark: { type: String, default: '' },
  logDetails: {
    ip: String,
    browser: String,
    device: String,
    userAgent: String
  },
  statusHistory: [statusHistorySchema]
}, { timestamps: true });

// Push to status history when status is updated
tourEnquirySchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      remark: this.remark || ''
    });
  }
  next();
});

module.exports = mongoose.model("TourEnquiry", tourEnquirySchema);
