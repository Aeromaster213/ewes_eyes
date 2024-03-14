# text_routes.py

import os
from fastapi import APIRouter, Path, Query, HTTPException, Body
from src.controllers import text_controller  

router = APIRouter()

# Define endpoints

@router.post("/uploadText")  # Modified from /processText for consistency
async def upload_text(text: str = Body(...)):
    return await text_controller.upload_text(text)

@router.get("/retrieveText")
async def retrieve_text(query: str = Query(...)):
    return await text_controller.retrieve_text(query)

@router.post("/saveText/{filename}")
async def save_text(filename: str = Path(..., min_length=1), text: str = Body(...)):
    if not filename.isalnum() or os.path.exists(filename):
        raise HTTPException(status_code=400, detail="Invalid filename")

    await text_controller.save_text(filename, text)
    return {"message": f"Text saved successfully to {filename}"}

