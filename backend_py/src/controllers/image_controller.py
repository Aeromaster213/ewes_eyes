# image_controller.py

import os
import time
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from src.services import image_processing_service

upload_dir = os.path.join(os.path.dirname(__file__), '../../public/uploads')
download_dir = os.path.join(os.path.dirname(__file__), '../../public/downloads')

current_image_path = ''  # Variable to store the current image path
updated_image_file = ''  # Variable to store the updated image filename

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
