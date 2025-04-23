const Enquiry = require("../models/hotelenquiry");
const uaParser = require("ua-parser-js");

// ✅ Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, hotelId } = req.body;

    if (!name || !email || !phone || !message || !hotelId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Capture log details
    const ua = uaParser(req.headers['user-agent']);
    const logDetails = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: ua.browser.name + " " + ua.browser.version,
      device: ua.device.type || "Desktop",
      userAgent: req.headers['user-agent']
    };

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
      hotelId,
      logDetails
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
    const enquiries = await Enquiry.find().populate("hotelId", "title");
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};

// ✅ Get status history
exports.getStatusHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.status(200).json({ statusHistory: enquiry.statusHistory || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch status history" });
  }
};

// ✅ Update status and remark
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, remark } = req.body;
    const { id } = req.params;

    if (!["pending", "resolved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    if (enquiry.status !== status || remark) {
      enquiry.statusHistory.push({
        status: enquiry.status,
        changedAt: new Date(),
        remark: remark || `Status changed to ${status}`
      });
    }

    enquiry.status = status;
    if (remark) enquiry.remark = remark;

    const updatedEnquiry = await enquiry.save();

    res.status(200).json({
      message: "Enquiry status updated",
      enquiry: updatedEnquiry
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// ✅ Add remark separately
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

// ✅ Create manual enquiry (with log)
exports.createManualEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message,
      hotelId,
      status = "pending",
      remark = ""
    } = req.body;

    if (!name || !phone || !hotelId) {
      return res.status(400).json({ error: "Name, phone and hotel ID are required" });
    }

    const ua = uaParser(req.headers['user-agent']);
    const logDetails = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: ua.browser.name + " " + ua.browser.version,
      device: ua.device.type || "Desktop",
      userAgent: req.headers['user-agent']
    };

    const newEnquiry = new Enquiry({
      name,
      email: email || "manual@enquiry.com",
      phone,
      message: message || "Manual enquiry created by admin",
      hotelId,
      status,
      remark,
      isManual: true,
      logDetails
    });

    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Manual enquiry created successfully",
      enquiry: newEnquiry
    });

  } catch (error) {
    console.error("Error creating manual enquiry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create manual enquiry",
      details: error.message
    });
  }
};
