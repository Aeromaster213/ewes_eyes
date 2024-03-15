# image_routes.py

from fastapi import APIRouter, UploadFile, File, HTTPException
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

@router.post("/changeColor")
async def change_color(color_values: dict):
    if not color_values:
        raise HTTPException(status_code=400, detail="Color values are required")
    return await image_controller.update_image_color(color_values)

@router.get("/getUpdatedImage")
async def get_updated_image():
    return await image_controller.get_updated_image()

