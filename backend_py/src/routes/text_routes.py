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
async def retrieve_text():
    return await text_controller.retrieve_text()


