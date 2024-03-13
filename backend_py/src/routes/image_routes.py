# image_routes.py

from fastapi import APIRouter
from controllers import image_controller  # Import your image controller

router = APIRouter()

# Define endpoints using the router instance
@router.get("/getUploadPath")
async def get_upload_path():
    return await image_controller.get_upload_path()

@router.get("/performProcessing")
async def perform_processing():
    return await image_controller.perform_processing()

@router.get("/getDownloadPath")
async def get_download_path():
    return await image_controller.get_download_path()