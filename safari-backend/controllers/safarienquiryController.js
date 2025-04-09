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

// In your updateEnquiry function
exports.updateEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remark } = req.body;

        const enquiry = await SafariBookingEnquiry.findByIdAndUpdate(
            id,
            { 
                status, 
                remark,
                $push: {
                    statusHistory: {
                        status,
                        remark,
                        changedAt: new Date()
                        // changedBy: req.user._id // if you have authentication
                    }
                }
            },
            { new: true }
        );
        
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Enquiry updated successfully", 
            enquiry 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update enquiry" });
    }
};
// Add this to your existing safaribookingenquiry controller file
exports.createManualEnquiry = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            date,
            safariZone,
            vehicleType,
            safariTime,
            children,
            adults,
            status = "Pending",
            remark = ""
        } = req.body;

        // Basic validation
        if (!name || !phone || !safariZone || !vehicleType || !safariTime || !date || !adults) {
            return res.status(400).json({ 
                success: false, 
                error: "Name, phone, safari zone, vehicle type, safari time, date and adults are required" 
            });
        }

        // Validate date format
        if (isNaN(new Date(date).getTime())) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid date format" 
            });
        }

        // Validate vehicle type
        const validVehicleTypes = ["Jeep", "Canter"];
        if (!validVehicleTypes.includes(vehicleType)) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid vehicle type" 
            });
        }

        // Validate safari time
        const validSafariTimes = ["Morning", "Evening"];
        if (!validSafariTimes.includes(safariTime)) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid safari time" 
            });
        }

        const newEnquiry = new SafariBookingEnquiry({
            name,
            email: email || "manual@enquiry.com", // Default email if not provided
            phone,
            date: new Date(date),
            safariZone,
            vehicleType,
            safariTime,
            children: children || 0,
            adults,
            status,
            remark,
            isManual: true // Flag to identify manually created enquiries
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

// Add this new function to get status history
exports.getStatusHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await SafariBookingEnquiry.findById(id).select('statusHistory');
        
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        
        res.status(200).json({ 
            success: true, 
            statusHistory: enquiry.statusHistory || [] 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch status history" });
    }
};