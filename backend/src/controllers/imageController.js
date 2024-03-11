// imageController.js
const path = require('path');
const fs = require('fs');
const imageProcessingService = require('../services/imageProcessingService');

const uploadDir = path.join(__dirname, '../../public/uploads');
const downloadDir = path.join(__dirname, '../../public/downloads');

let currentImagePath = ''; // Variable to store the current image path
let updatedImageFile = ''; // Variable to store the updated image path

const imageController = {
  getUploadPath: (req, res) => {
    const filename = `image_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);

    // Save the current image path for later processing
    currentImagePath = imagePath;

    res.json({ uploadPath: imagePath, filename });
  },

  performProcessing: (req, res) => {
    if (!currentImagePath) {
      return res.status(400).json({ error: 'No image path found for processing' });
    }

    // Perform necessary image processing
    const filename = `processed_${Date.now()}.jpg`;
    const processedImagePath = path.join(downloadDir, filename);
    const width = 300;
    const height = 200;

    imageProcessingService.resizeImage(currentImagePath, processedImagePath, width, height)
      .then(() => {
        console.log('Image processed successfully.');
        updatedImageFile = filename;
        currentImagePath = ''; // Reset the current image path after processing
        res.json({ status: 'OK' });
      })
      .catch((error) => {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
      });
  },

  getDownloadPath: (req, res) => {
    // const { filename } = req.query;
    const filename = updatedImageFile;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename parameter is required' });
    }

    const downloadPath = path.join(downloadDir, filename);
    
    if (fs.existsSync(downloadPath)) {
      res.json({ downloadPath, filename });
    } else {
      res.status(404).json({ error: 'Processed image not found' });
    }
  },
};

module.exports = imageController;
