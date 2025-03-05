const Enquiry = require("../models/hotelenquiry");

// ✅ Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, hotelId } = req.body;

    if (!name || !email || !phone || !message || !hotelId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
      hotelId,
    });

    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully", enquiry: newEnquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch all enquiries (Admin Panel)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("hotelId", "title"); // Fetch hotel details
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};

// ✅ Update Enquiry Status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["pending", "resolved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.status(200).json({ message: "Enquiry status updated", enquiry: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// ✅ Add Remark to Enquiry
exports.addRemarkToEnquiry = async (req, res) => {
  try {
    const { remark } = req.body;
    const { id } = req.params;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { remark },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.status(200).json({ message: "Remark added successfully", enquiry: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ error: "Failed to add remark" });
  }
};
