const SafariBookingEnquiry = require('../models/safaribookingenquiry')
exports.createEnquiry = async (req, res) => {
    console.log("Received Enquiry Data:", req.body); // Debugging
    try {
        // ✅ Remove empty keys from request body
        const cleanedData = Object.fromEntries(
            Object.entries(req.body).filter(([key, value]) => key.trim() !== "" && value !== "")
        );

        const { name, email, phone, date, safariZone, vehicleType, safariTime, children, adults } = cleanedData;

        if (!name || !email || !phone || !safariZone || !vehicleType || !safariTime || !date || !adults) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newEnquiry = new SafariBookingEnquiry({
            name,
            email,
            phone,
            date,
            safariZone,
            vehicleType,
            safariTime,
            children,
            adults,
            status: "Pending",
        });

        await newEnquiry.save();
        res.status(201).json({ success: true, message: "Enquiry submitted successfully", enquiry: newEnquiry });

    } catch (error) {
        console.log("Error creating safari enquiry", error);
        res.status(500).json({ success: false, error: "Failed to submit enquiry" });
    }
};

exports.getAllSafariEnquiries = async (req, res) => {
    try {
        const enquiries = await SafariBookingEnquiry.find();
        console.log("Fetched Enquiries from DB:", enquiries); // ✅ Check DB response

        res.status(200).json({ success: true, enquiries: enquiries || [] }); 
    } catch (error) {
        console.error("Error in getting enquiries:", error);
        res.status(500).json({ success: false, error: "Failed to fetch enquiry", enquiries: [] });
    }
};

exports.updateEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remark } = req.body;

        const enquiry = await SafariBookingEnquiry.findByIdAndUpdate(
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