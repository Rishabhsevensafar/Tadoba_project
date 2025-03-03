const express = require('express');
const router = express.Router();
const hotelPackageController = require('../controllers/hotelPackages');
const upload = require('../middleware/upload'); // Multer Middleware

// Apply `upload.array('images', 10)` middleware for image upload
router.post('/hotel-packages', upload.array('images', 10), hotelPackageController.createHotelPackage);
router.get('/hotel-packages', hotelPackageController.getAllHotelPackages);
router.get('/hotel-packages/:id', hotelPackageController.getHotelPackageById);
router.delete('/hotel-packages/:id', hotelPackageController.deleteHotelPackage);

module.exports = router;
