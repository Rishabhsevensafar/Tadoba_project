const express = require("express");
const { uploadBannerImages, getBannerImages } = require("../controllers/heroController");
const router = express.Router();

router.post("/upload-banner", uploadBannerImages);
router.get("/get-banner", getBannerImages);

module.exports = router;
