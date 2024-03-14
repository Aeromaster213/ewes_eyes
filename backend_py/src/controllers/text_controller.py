# text_routes.py

import os
from fastapi import APIRouter, Path, Query, HTTPException, Body 

from src.controllers import text_controller  # Assuming a text controller exists

router = APIRouter()

# Define endpoints

@router.post("/processText")  # Example for processing text input
async def process_text(text: str = Body(...)):
    return await text_controller.process_text(text)

@router.get("/retrieveText")  # Example for retrieving text data
async def retrieve_text(query: str = Query(...)):  # Assuming query-based retrieval
    return await text_controller.retrieve_text(query)

@router.post("/saveText/{filename}")
async def save_text(filename: str = Path(..., min_length=1), text: str = Body(...)):
    # Validate input to prevent potential filename-related vulnerabilities
    if not filename.isalnum() or os.path.exists(filename):
        raise HTTPException(status_code=400, detail="Invalid filename")

    # Call the text controller to handle saving
    await text_controller.save_text(filename, text)
    return {"message": f"Text saved successfully to {filename}"}
