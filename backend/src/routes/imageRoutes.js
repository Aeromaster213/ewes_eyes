const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to get upload path
router.get('/getUploadPath', imageController.getUploadPath);

// Route to get uploaded image
router.get('/getUploadedImage', imageController.getUploadedImage);

module.exports = router;
