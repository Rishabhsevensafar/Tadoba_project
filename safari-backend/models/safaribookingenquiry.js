const mongoose = require("mongoose")
const statusHistorySchema = new mongoose.Schema({
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Success', 'Not Interested', 'No Response']
    },
    remark: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // if you have user authentication
    },
    changedAt: {
      type: Date,
      default: Date.now
    }
  });
  
const SafariBookingEnquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        safariZone: { type: String, required: true },
        vehicleType: { type: String, required: true, enum: ["Jeep", "Canter"] },
        safariTime: { type: String, required: true, enum: ["Morning", "Evening"] },
        children: { type: Number, default: 0 },
        adults: { type: Number, required: true },
        status: { type: String, enum: ["Pending", "Success", "Not Interested", "No Response"], default: "Pending" }, // Admin can change status
        remark: { type: String, default: "" }, // Admin can add remark
        logDetails: {
          ip: String,
          browser: String,
          device: String,
          userAgent: String,
        },
        statusHistory: [statusHistorySchema]
    },
    { timestamps: true }
)
// Add this middleware to automatically add to statusHistory when status changes
SafariBookingEnquirySchema.pre('save', function(next) {
    if (this.isModified('status')) {
      if (!this.statusHistory) {
        this.statusHistory = [];
      }
      this.statusHistory.push({
        status: this.status,
        remark: this.remark || '',
        // changedBy: this._req.user._id // if you have authentication
      });
    }
    next();
  });
module.exports = mongoose.model("SafariBookingEnquiry", SafariBookingEnquirySchema);