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
        const package = await HotelPackage.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(package);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Hotel Package and Remove Images
exports.deleteHotelPackage = async (req, res) => {
    try {
        const package = await HotelPackage.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }

        // Delete images from uploads folder
        package.images.forEach(image => {
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

        const package = await HotelPackage.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: "Hotel package not found" });
        }

        // ✅ Keep existing images if no new images are uploaded
        let imagePaths = package.images;
        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => `/uploads/hotel/${file.filename}`);
        }

        // ✅ Update hotel package details
        package.title = req.body.title || package.title;
        package.description = req.body.description || package.description;
        package.room_type = req.body.room_type || package.room_type;
        package.number_of_stars = req.body.number_of_stars || package.number_of_stars;
        package.real_price = req.body.real_price || package.real_price;
        package.discounted_price = req.body.discounted_price || package.discounted_price;
        
        package.amenities = Array.isArray(req.body.amenities) 
            ? req.body.amenities 
            : package.amenities;

        package.facilities = Array.isArray(req.body.facilities) 
            ? req.body.facilities 
            : package.facilities;

        package.map_location = req.body.map_location || package.map_location;
        package.images = imagePaths; // ✅ Keep existing images if no new ones are uploaded

        if (req.body.location) {
            package.location.name = req.body.location.name || package.location.name;
            package.location.pincode = req.body.location.pincode || package.location.pincode;
        }

        console.log("Updated Package Data:", package);

        const updatedPackage = await package.save();
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