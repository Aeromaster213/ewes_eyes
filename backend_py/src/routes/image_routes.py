# image_routes.py

from fastapi import APIRouter, UploadFile, File
from src.controllers import image_controller  # Import your image controller

router = APIRouter()

# Define endpoints using the router instance


@router.post("/uploadImage")
async def upload_image(image: UploadFile = File(...)):
    return await image_controller.upload_image(image)

@router.get("/getInputColors")
async def get_input_colors():
    return await image_controller.get_input_colors()

@router.get("/getGeneratedImage")
async def get_generated_image():
    return await image_controller.get_generated_image()



# Other unused endpoints

@router.get("/getUploadPath")
async def get_upload_path():
    return await image_controller.get_upload_path()

@router.get("/performProcessing")
async def perform_processing():
    return await image_controller.perform_processing()

@router.get("/getDownloadPath")
async def get_download_path():
    return await image_controller.get_download_path()