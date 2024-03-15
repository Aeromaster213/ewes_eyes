import axios from "axios";
import toast from "react-hot-toast";

export async function uploadImage(imageFile: File, onSuccess: () => void, onError: () => void) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post('http://localhost:8000/api/uploadImage', formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type' : imageFile.type
            }
        });
        console.log('Image uploaded successfully:', response.data);
        onSuccess()
        // Call to upload text prompt after image upload
    } catch (error) {
        onError();
        console.error('Error uploading image:: ', error);
    }
}

export async function getGeneratedImage() {
    try {
        toast.loading("getting image!")
        const response = await axios.get('http://localhost:8000/api/getGeneratedImage');
        console.log('Generated image retrieved successfully:', response.data);
    } catch (error) {
        toast.error("could not get image")
        console.error('Error getting generated image:', error);
    }
}

export async function getInputColors() {

    try {
        const response = await axios.get('http://localhost:8000/api/getInputColors');
        console.log('Input colors retrieved successfully:', response.data);

        // Call to get generated image after input colors are retrieved
        // await getGeneratedImage();
        return response.data;
    } catch (error) {
        console.error('Error getting input colors:', error);
    }
}

export async function uploadText(prompt,onSuccess: () => void, onError: () => void) {
    try {
        const response = await axios.post('http://localhost:8000/api/uploadText', prompt);
        console.log('Text prompt uploaded successfully:', response.data);

        // Call to get input colors after text prompt upload
        await getInputColors();
        onSuccess()
    } catch (error) {
        onError();
        console.error('Error uploading text prompt:', error);
    }
}