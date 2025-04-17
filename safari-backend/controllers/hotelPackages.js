// Create Hotel Package with Image Upload
const HotelPackage = require('../models/hotel');
const fs = require('fs');
const path = require('path');
exports.createHotelPackage = async (req, res) => {
    try {
        const imagePaths = req.files ? req.files.map(file => `/uploads/hotel/${file.filename}`) : [];

        // Check required fields
        if (!req.body.title || !req.body.description || !req.body.location || !req.body.room_type) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newPackage = new HotelPackage({
            title: req.body.title,
            description: req.body.description,
            images: imagePaths,
            location: {
                name: req.body.location.name,
                pincode: req.body.location.pincode
            },
            room_type: req.body.room_type,
            number_of_stars: req.body.number_of_stars,
            amenities: req.body.amenities || [],
            facilities: req.body.facilities || [],
            real_price: req.body.real_price,
            discounted_price: req.body.discounted_price,
            map_location: req.body.map_location
        });

        await newPackage.save();
        res.status(201).json({ message: "Hotel Created Successfully", package: newPackage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllHotelPackages = async (req, res) => {
    try {
      const hotels = await HotelPackage.find({});
      
      res.status(200).json({ success: true, hotels }); // ✅ Ensure `hotels` is inside an object
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ success: false, error: "Failed to retrieve hotels" });
    }
  };

// Get Hotel Package by ID
exports.getHotelPackageById = async (req, res) => {
    try {
        const hotelpackage = await HotelPackage.findById(req.params.id);
        if (!hotelpackage) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(hotelpackage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Hotel Package and Remove Images
exports.deleteHotelPackage = async (req, res) => {
    try {
        const hotelpackage = await HotelPackage.findById(req.params.id);
        if (!hotelpackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        // Delete images from uploads folder
        hotelpackage.images.forEach(image => {
            const imagePath = path.join(__dirname, "..", image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        });

        await HotelPackage.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Hotel package deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateHotelPackage = async (req, res) => {
    try {
        console.log("Received Update Request for ID:", req.params.id);
        console.log("Request Body:", req.body);

        const hotelpackage = await HotelPackage.findById(req.params.id);
        if (!hotelpackage) {
            return res.status(404).json({ message: "Hotel package not found" });
        }

        // ✅ Keep existing images if no new images are uploaded
        let imagePaths = hotelpackage.images;
        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => `/uploads/hotel/${file.filename}`);
        }

        // ✅ Update hotel package details
        hotelpackage.title = req.body.title || hotelpackage.title;
        hotelpackage.description = req.body.description || hotelpackage.description;
        hotelpackage.room_type = req.body.room_type || hotelpackage.room_type;
        hotelpackage.number_of_stars = req.body.number_of_stars || hotelpackage.number_of_stars;
        hotelpackage.real_price = req.body.real_price || hotelpackage.real_price;
        hotelpackage.discounted_price = req.body.discounted_price || hotelpackage.discounted_price;
        
        hotelpackage.amenities = Array.isArray(req.body.amenities) 
            ? req.body.amenities 
            : hotelpackage.amenities;

        hotelpackage.facilities = Array.isArray(req.body.facilities) 
            ? req.body.facilities 
            : hotelpackage.facilities;

        hotelpackage.map_location = req.body.map_location || hotelpackage.map_location;
        hotelpackage.images = imagePaths; // ✅ Keep existing images if no new ones are uploaded

        if (req.body.location) {
            hotelpackage.location.name = req.body.location.name || hotelpackage.location.name;
            hotelpackage.location.pincode = req.body.location.pincode || hotelpackage.location.pincode;
        }

        console.log("Updated Package Data:", hotelpackage);

        const updatedPackage = await hotelpackage.save();
        res.status(200).json({ message: "Hotel package updated successfully", package: updatedPackage });

    } catch (error) {
        console.error("Update Hotel Package Error:", error);
        res.status(500).json({ error: error.message });
    }
};


// ✅ Get only hotel titles & IDs for dropdown
exports.getAllHotelsForDropdown = async (req, res) => {
    try {
        const hotels = await HotelPackage.find({}, "_id title"); // Fetch only title & ID
        res.json({ success: true, hotels });
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).json({ success: false, error: "Failed to retrieve hotels" });
    }
};