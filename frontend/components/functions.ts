import axios from "axios";
import toast from "react-hot-toast";

export async function uploadImage(imageFile: File, onSuccess: () => void, onError: () => void) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post('http://10.23.91.240:8000/api/uploadImage', formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': imageFile.type
            }
        });
        console.log('Image uploaded successfully:', response.data);
        onSuccess()
        // Call to upload text prompt after image upload
    } catch (error) {
        // onError();
        console.error('Error uploading image:: ', error);
        throw error;
    }
}

export async function getGeneratedImage() {
    try {
        const response = await axios.get('http://10.23.91.240:8000/api/getGeneratedImage', {
            responseType: 'arraybuffer'
        });
        const binary = Buffer.from(response.data, 'binary').toString('base64');
        return response.data;    
    } catch (error) {
        console.error('Error getting generated image:', error);
        throw error;
    }
}

export async function getUpdatedimage() {
    try {
        const response = await axios.get('http://10.23.91.240:8000/api/getUpdatedImage', {
            responseType: 'arraybuffer'
        });
        const binary = Buffer.from(response.data, 'binary').toString('base64');
        return response.data;
    }
    catch ( error ){
        throw error;
    }
}

export async function getInputColors() {

    try {
        const response = await axios.get('http://10.23.91.240:8000/api/getInputColors');
        console.log('Input colors retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting input colors:', error);
    }
}

export async function uploadText(prompt, onSuccess: () => void, onError: () => void) {
    try {
        const response = await axios.post('http://10.23.91.240:8000/api/uploadText', prompt);
        console.log('Text prompt uploaded successfully:', response.data);

        // Call to get input colors after text prompt upload
        await getInputColors();
        onSuccess()
        return response.data;
    } catch (error) {
        // onError();
        console.error('Error uploading text prompt:', error);
        throw error;
    }
}

export async function changeColour(colour, onSuccess: () => void, onError: () => void){
    const c = JSON.stringify(colour)
    console.log(c)
    try {
        const response = await axios.post('http://10.23.91.240:8000/api/changeColor', colour);
        console.log('Color changed successfully:', response.data);
        onSuccess();
        return response.data;
    } catch (error) {
        throw error;
    }
}

