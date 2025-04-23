const express = require("express");
const router = express.Router();
const PageSEO = require("../models/PageSeo");

// Create or Update SEO for a page
router.post("/set-page-seo", async (req, res) => {
  const { path, metaTitle, metaDescription, metaKeywords, canonicalUrl, noIndex } = req.body;

  try {
    const updated = await PageSEO.findOneAndUpdate(
      { path },
      { metaTitle, metaDescription, metaKeywords, canonicalUrl, noIndex },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, seo: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get SEO data for a specific path
router.get("/get-page-seo", async (req, res) => {
  const { path } = req.query;

  try {
    const seoData = await PageSEO.findOne({ path });
    res.status(200).json({ success: true, seo: seoData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
