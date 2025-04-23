const TourPackage = require("../models/package");
const mongoose = require("mongoose");
const path = require("path");

const createTourPackage = async (req, res) => {
  try {
    let {
      hotels,
      title,
      description,
      price,
      location,
      duration,
      startDate,
      endDate,
      totalSeats,
      itinerary,
      includes,
      excludes,
    } = req.body;

    // Parse hotels
    if (hotels) {
      if (typeof hotels === "string") hotels = JSON.parse(hotels);
      if (!Array.isArray(hotels)) {
        return res.status(400).json({ success: false, error: "Hotels must be an array" });
      }
      hotels = hotels.map(id => new mongoose.Types.ObjectId(id));
    } else {
      hotels = [];
    }

    // Helper to parse JSON fields
    const parseArray = (data) => {
      if (!data) return [];
      if (typeof data === "string") {
        try {
          return JSON.parse(data);
        } catch {
          return [];
        }
      }
      return Array.isArray(data) ? data : [];
    };

    const includesArray = parseArray(includes);
    const excludesArray = parseArray(excludes);
    const itineraryArray = parseArray(itinerary);

    // ✅ Itinerary images matching by order
    const itineraryImages = req.files?.itineraryImages || [];
    const mappedItinerary = itineraryArray.map((item, index) => ({
      title: item.title,
      activities: item.activities,
      image: itineraryImages[index]?.filename || null,
    }));

    // ✅ Package images
    const images = req.files?.images?.map(file => file.filename) || [];

    const newPackage = new TourPackage({
      title,
      description,
      price,
      location,
      duration,
      startDate,
      endDate,
      totalSeats,
      itinerary: mappedItinerary,
      includes: includesArray,
      excludes: excludesArray,
      hotels,
      images,
    });

    await newPackage.save();
    res.status(201).json({ success: true, message: "Tour package created successfully", package: newPackage });
  } catch (error) {
    console.error("Error creating tour package:", error);
    res.status(500).json({ success: false, error: "Failed to create tour package" });
  }
};

const getAllTourPackages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPackages = await TourPackage.countDocuments();
    const packages = await TourPackage.find()
      .skip(skip)
      .limit(limit)
      .populate("hotels", "title location");

    res.json({ success: true, packages, totalPackages });
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve tour packages" });
  }
};

const getTourPackageById = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findById(req.params.id).populate("hotels");
    if (!tourPackage) return res.status(404).json({ success: false, error: "Package not found" });

    res.json({ success: true, package: tourPackage });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve package" });
  }
};

const updateTourPackage = async (req, res) => {
  try {
    let updatedData = req.body;

    // ✅ Hotels parsing
    if (updatedData.hotels) {
      const parsedHotels = typeof updatedData.hotels === "string"
        ? JSON.parse(updatedData.hotels)
        : updatedData.hotels;

      updatedData.hotels = parsedHotels.map(id => new mongoose.Types.ObjectId(id));
    }

    // ✅ JSON fields parsing
    const itineraryArray = typeof updatedData.itinerary === "string"
      ? JSON.parse(updatedData.itinerary)
      : updatedData.itinerary || [];

    const includesArray = typeof updatedData.includes === "string"
      ? JSON.parse(updatedData.includes)
      : updatedData.includes || [];

    const excludesArray = typeof updatedData.excludes === "string"
      ? JSON.parse(updatedData.excludes)
      : updatedData.excludes || [];

    // ✅ Map itinerary with new images (by order)
    const itineraryImages = req.files?.itineraryImages || [];
    updatedData.itinerary = itineraryArray.map((item, index) => ({
      title: item.title,
      activities: item.activities,
      image: itineraryImages[index]?.filename || item.image || null,
    }));

    // ✅ Update images if new ones are uploaded
    if (req.files?.images && req.files.images.length > 0) {
      updatedData.images = req.files.images.map(file => file.filename);
    }

    updatedData.includes = includesArray;
    updatedData.excludes = excludesArray;

    const updatedPackage = await TourPackage.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ success: false, error: "Package not found" });
    }

    res.json({ success: true, message: "Tour package updated successfully", package: updatedPackage });
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ success: false, error: "Failed to update package" });
  }
};

const deleteTourPackage = async (req, res) => {
  try {
    const deletedPackage = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ success: false, error: "Package not found" });

    res.json({ success: true, message: "Tour package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ success: false, error: "Failed to delete package" });
  }
};

const togglePackageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedPackage = await TourPackage.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, message: "Package status updated successfully!", package: updatedPackage });
  } catch (error) {
    console.error("Error toggling package status:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

module.exports = {
  createTourPackage,
  getAllTourPackages,
  getTourPackageById,
  updateTourPackage,
  deleteTourPackage,
  togglePackageStatus,
};
