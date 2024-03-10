const sharp = require('sharp'); 

const imageProcessingService = {
  resizeImage: async (imagePath, outputFilePath, width, height) => {
    try {
      // Use the 'sharp' library to resize the image
      await sharp(imagePath)
        .resize({ width, height })
        .toFile(outputFilePath);

      console.log('Image resized successfully.');
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  },
  // Add more image processing functions as needed
};

module.exports = imageProcessingService;