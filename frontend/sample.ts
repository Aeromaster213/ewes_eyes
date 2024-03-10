// Assuming you have a function to handle image uploads
async function uploadImage() {
    try {
        // Step 1: Get the upload path from the backend
        const uploadPathResponse = await fetch('http://localhost:5000/api/getUploadPath');
        const uploadPathData = await uploadPathResponse.json();

        // Simulate image upload (replace this with your actual image upload logic)
        const formData = new FormData();
        formData.append('image', /* your image file */);

        // Step 2: Upload the image to the obtained path
        await fetch(uploadPathData.uploadPath, {
            method: 'POST',
            body: formData,
        });

        // Step 3: Trigger image processing on the backend
        const processingResponse = await fetch('http://localhost:5000/api/performProcessing');
        const processingData = await processingResponse.json();

        if (processingData.status === 'OK') {
            console.log('Image processing completed successfully.');

            // Step 4: Get the download path for the processed image
            const downloadPathResponse = await fetch(`http://localhost:5000/api/getDownloadPath?filename=${uploadPathData.filename}`);
            const downloadPathData = await downloadPathResponse.json();

            console.log('Download Path:', downloadPathData.downloadPath);

            // Now you can use the download path to display the processed image
        } else {
            console.error('Error processing image on the backend.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the uploadImage function when needed
uploadImage();