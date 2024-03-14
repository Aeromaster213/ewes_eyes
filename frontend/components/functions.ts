import axios from "axios";

export async function uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post('http://localhost:5000/api/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Image uploaded successfully:', response.data);

        // Call to upload text prompt after image upload
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

export async function getGeneratedImage() {
    try {
        const response = await axios.get('http://localhost:5000/api/getGeneratedImage');
        console.log('Generated image retrieved successfully:', response.data);
    } catch (error) {
        console.error('Error getting generated image:', error);
    }
}

export async function getInputColors() {

    try {
        const response = await axios.get('http://localhost:5000/api/getInputColors');
        console.log('Input colors retrieved successfully:', response.data);
        
        // Call to get generated image after input colors are retrieved
        await getGeneratedImage();
        return response.data;
    } catch (error) {
        console.error('Error getting input colors:', error);
    }
}

export async function uploadText(prompt) {
    try {
        const response = await axios.post('http://localhost:5000/api/uploadText', { prompt });
        console.log('Text prompt uploaded successfully:', response.data);

        // Call to get input colors after text prompt upload
        await getInputColors();
    } catch (error) {
        console.error('Error uploading text prompt:', error);
    }
}