const TourPackage = require("../models/package");
const mongoose = require("mongoose");

const createTourPackage = async (req, res) => {
  try {
      let { hotels, title, description, price, location, duration, startDate, endDate, totalSeats, itinerary, includes, excludes } = req.body;

      // ✅ Ensure `hotels` is properly parsed
      if (hotels) {
          try {
              if (typeof hotels === "string") {
                  hotels = JSON.parse(hotels);
              }
              if (!Array.isArray(hotels)) {
                  return res.status(400).json({ success: false, error: "Hotels must be an array" });
              }
              hotels = hotels.map(id => new mongoose.Types.ObjectId(id));
          } catch (error) {
              return res.status(400).json({ success: false, error: "Invalid JSON format for hotels field" });
          }
      } else {
          hotels = [];
      }

      // ✅ Ensure arrays are parsed correctly
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

      const newPackage = new TourPackage({
          title,
          description,
          price,
          location,
          duration,
          startDate,
          endDate,
          totalSeats,
          itinerary: parseArray(itinerary),
          includes: parseArray(includes),
          excludes: parseArray(excludes),
          hotels
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

    // Fetch total number of packages
    const totalPackages = await TourPackage.countDocuments(); // ✅ Correct way to count packages

    // Fetch paginated packages
    const packages = await TourPackage.find().skip(skip).limit(limit).populate("hotels", "title location");

    res.json({ success: true, packages, totalPackages });
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve tour packages" });
  }
};


// ✅ Get a Single Tour Package by ID
const getTourPackageById = async (req, res) => {
  try {
    const package = await TourPackage.findById(req.params.id);
    if (!package) return res.status(404).json({ success: false, error: "Package not found" });

    res.json({ success: true, package });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve package" });
  }
};

const updateTourPackage = async (req, res) => {
  try {
      let updatedData = req.body;

      // ✅ Ensure `hotels` is an array of ObjectIds
      if (updatedData.hotels) {
          try {
              // If `hotels` is a stringified array, parse it
              const parsedHotels = typeof updatedData.hotels === "string" ? JSON.parse(updatedData.hotels) : updatedData.hotels;

              // Convert hotel IDs to ObjectIds
              updatedData.hotels = parsedHotels.map(id => new mongoose.Types.ObjectId(id));
          } catch (error) {
              return res.status(400).json({ success: false, error: "Invalid format for hotels field" });
          }
      }

      // ✅ Ensure `itinerary`, `includes`, and `excludes` are properly parsed
      if (typeof updatedData.itinerary === "string") {
          updatedData.itinerary = JSON.parse(updatedData.itinerary);
      }
      if (typeof updatedData.includes === "string") {
          updatedData.includes = JSON.parse(updatedData.includes);
      }
      if (typeof updatedData.excludes === "string") {
          updatedData.excludes = JSON.parse(updatedData.excludes);
      }

      const updatedPackage = await TourPackage.findByIdAndUpdate(
          req.params.id,
          updatedData,
          { new: true, runValidators: true }
      );

      if (!updatedPackage) return res.status(404).json({ success: false, error: "Package not found" });

      res.json({ success: true, message: "Tour package updated successfully", package: updatedPackage });

  } catch (error) {
      console.error("Error updating package:", error);
      res.status(500).json({ success: false, error: "Failed to update package" });
  }
};



// ✅ Delete a Tour Package
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
    const { id } = req.params; // ✅ Ensure correct parameter usage
    const { isActive } = req.body;

    const updatedPackage = await TourPackage.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true } // ✅ Ensure updated document is returned
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

module.exports = { createTourPackage, getAllTourPackages, getTourPackageById, updateTourPackage, deleteTourPackage, togglePackageStatus };
