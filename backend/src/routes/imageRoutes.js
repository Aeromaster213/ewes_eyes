// imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to get upload path
router.get('/getUploadPath', imageController.getUploadPath);

// Route to perform image processing
router.get('/performProcessing', imageController.performProcessing);

// Route to get download path
router.get('/getDownloadPath', imageController.getDownloadPath);

module.exports = router;
