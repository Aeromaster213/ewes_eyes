# image_controller.py

import os
import time
import asyncio
from fastapi import HTTPException
from fastapi.responses import JSONResponse, FileResponse
from src.services import image_processing_service
from src.services import text_processing_service

upload_dir = os.path.join(os.path.dirname(__file__), '../../public/uploads')
download_dir = os.path.join(os.path.dirname(__file__), '../../public/downloads')

current_image_path = ''  # Variable to store the current image path
updated_image_file = ''  # Variable to store the updated image filename


uploaded_image_path = ''  # Variable to store the uploaded image path
text_prompt = ''  # Variable to store the text prompt
input_colors = []  # Variable to store the input colors
generated_image_path = ''  # Variable to store the generated image path

async def upload_image(image):
    global uploaded_image_path
    filename = f'image_{int(time.time())}.jpg'
    uploaded_image_path = os.path.join(upload_dir, filename)
    with open(uploaded_image_path, "wb") as buffer:
        buffer.write(await image.read())
    # await process_image()
    return JSONResponse(content={"status": "OK"})

async def get_input_colors():
    global input_colors
    while not input_colors:
        await asyncio.sleep(1)  # Wait until input colors are available
    return JSONResponse(content={"inputColors": input_colors})

async def get_generated_image():
    global generated_image_path
    while not generated_image_path:
        await asyncio.sleep(1)  # Wait until generated image is available
    # Determine the media type based on the file extension
    media_type = "image/jpeg" if generated_image_path.endswith(".jpg") else "image/png"
    return FileResponse(path=generated_image_path, media_type=media_type)

async def process_image():
    global input_colors, generated_image_path, text_prompt
    text_prompt = await text_processing_service.get_text_prompt()
    input_colors = await image_processing_service.generate_color_palette(uploaded_image_path)
    generated_image_path = await image_processing_service.generate_image(uploaded_image_path, text_prompt)


# Other unused methods

async def get_upload_path():
    global current_image_path
    filename = f'image_{int(time.time())}.jpg'
    current_image_path = os.path.join(upload_dir, filename)
    return JSONResponse(content={"uploadPath": current_image_path, "filename": filename})

async def perform_processing():
    global current_image_path, updated_image_file
    if not current_image_path:
        raise HTTPException(status_code=400, detail="No image path found for processing")
    
    # Perform necessary image processing
    filename = f'processed_{int(time.time())}.jpg'
    processed_image_path = os.path.join(download_dir, filename)
    width = 300
    height = 200
    
    await image_processing_service.resize_image(current_image_path, processed_image_path, width, height)
    updated_image_file = filename
    current_image_path = ''  # Reset the current image path after processing
    return JSONResponse(content={"status": "OK"})

async def get_download_path():
    global updated_image_file
    if not updated_image_file:
        raise HTTPException(status_code=400, detail="Filename parameter is required")
    
    download_path = os.path.join(download_dir, updated_image_file)
    if os.path.exists(download_path):
        return JSONResponse(content={"downloadPath": download_path, "filename": updated_image_file})
    else:
        raise HTTPException(status_code=404, detail="Processed image not found")
