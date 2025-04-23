const TourEnquiry = require("../models/tourenquirymodel");
const mongoose = require("mongoose");
const uaParser = require("ua-parser-js");

exports.createTourEnquiry = async (req, res) => {
  try {
    const { name, email, phone, country, message, hotelId, packageId } = req.body;

    const ua = uaParser(req.headers["user-agent"]);
    const logDetails = {
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      browser: ua.browser.name + " " + ua.browser.version,
      device: ua.device.type || "Desktop",
      userAgent: req.headers["user-agent"]
    };

    const newEnquiry = new TourEnquiry({
      name,
      email,
      phone,
      country,
      message,
      hotel: hotelId ? new mongoose.Types.ObjectId(hotelId) : null,
      package: packageId ? new mongoose.Types.ObjectId(packageId) : null,
      status: "Pending",
      logDetails
    });

    await newEnquiry.save();
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry: newEnquiry
    });
  } catch (error) {
    console.error("Error creating tour enquiry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit enquiry"
    });
  }
};

exports.getAllTourEnquiries = async (req, res) => {
  try {
    const enquiries = await TourEnquiry.find()
      .populate("hotel", "title")
      .populate("package", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    console.error("Error fetching tour enquiries:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve enquiries" });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    const updated = await TourEnquiry.findByIdAndUpdate(
      id,
      {
        status,
        remark,
        $push: {
          statusHistory: {
            status,
            remark,
            changedAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry: updated
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ success: false, error: "Failed to update enquiry" });
  }
};
