const path = require('path');
const fs = require('fs');
const imageProcessingService = require('../services/imageProcessingService');

const uploadDir = path.join(__dirname, '../../public/uploads');
const downloadDir = path.join(__dirname, '../../public/downloads');

const imageController = {
  getUploadPath: (req, res) => {
    // Generate a unique filename for the uploaded image
    const filename = `image_${Date.now()}.jpg`;
    const imagePath = path.join(uploadDir, filename);

    // Respond with the generated upload path and filename
    res.json({ uploadPath: imagePath, filename });
  },

  getUploadedImage: (req, res) => {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ error: 'Filename parameter is required' });
    }

    const imagePath = path.join(uploadDir, filename);

    if (fs.existsSync(imagePath)) {
      // Perform necessary image processing (resize, filter, etc.)
      const processedImagePath = path.join(downloadDir, `processed_${filename}`);
      const width = 300;
      const height = 200;

      imageProcessingService.resizeImage(imagePath, processedImagePath, width, height)
        .then(() => {
          console.log('Image processed successfully.');
          res.json({ processedImagePath, filename });
        })
        .catch((error) => {
          console.error('Error processing image:', error);
          res.status(500).json({ error: 'Error processing image' });
        });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  },

  getDownloadPath: (req, res) => {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ error: 'Filename parameter is required' });
    }

    const downloadPath = path.join(downloadDir, `processed_${filename}`);

    if (fs.existsSync(downloadPath)) {
      res.json({ downloadPath, filename });
    } else {
      res.status(404).json({ error: 'Processed image not found' });
    }
  },
};

module.exports = imageController;