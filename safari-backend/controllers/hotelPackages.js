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


// Get All Hotel Packages
exports.getAllHotelPackages = async (req, res) => {
    try {
        const packages = await HotelPackage.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
