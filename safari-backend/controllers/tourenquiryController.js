const TourEnquiry = require("../models/tourenquirymodel");
const HotelPackage = require("../models/hotel"); // Ensure correct model import
const TourPackage = require("../models/package");
// ✅ Create Enquiry API
exports.createTourEnquiry = async (req, res) => {
    try {
      const { name, email, phone, country, message, hotelId, packageId } = req.body;
  
      const newEnquiry = new TourEnquiry({
        name,
        email,
        phone,
        country,
        message,
        hotel: hotelId ? new mongoose.Types.ObjectId(hotelId) : null, // ✅ Convert to ObjectId
        package: packageId ? new mongoose.Types.ObjectId(packageId) : null, // ✅ Convert to ObjectId
        status: "Pending",
      });
  
      await newEnquiry.save();
      res.status(201).json({ success: true, message: "Enquiry submitted successfully", enquiry: newEnquiry });
    } catch (error) {
      console.error("Error creating tour enquiry:", error);
      res.status(500).json({ success: false, error: "Failed to submit enquiry" });
    }
  };
  
// ✅ Get All Enquiries API (Admin Panel)
exports.getAllTourEnquiries = async (req, res) => {
    try {
      const enquiries = await TourEnquiry.find()
        .populate("hotel", "title")  // ✅ Populate hotel title
        .populate("package", "title") // ✅ Populate package title
        .exec();

        res.status(200).json({ success: true, enquiries });
    } catch (error) {
        console.error("Error fetching tour enquiries:", error);
        res.status(500).json({ success: false, error: "Failed to retrieve enquiries" });
    }
};
// ✅ Update Enquiry Status & Remark (Admin)
exports.updateEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remark } = req.body;

        const enquiry = await TourEnquiry.findByIdAndUpdate(
            id,
            { status, remark },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }

        res.status(200).json({ success: true, message: "Enquiry updated successfully", enquiry });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update enquiry" });
    }
};
