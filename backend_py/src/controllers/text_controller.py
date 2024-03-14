# text_controller.py

import os
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from src.services import text_processing_service

upload_dir = os.path.join(os.path.dirname(__file__), '../../public/uploads')
download_dir = os.path.join(os.path.dirname(__file__), '../../public/downloads')

uploaded_text_path = ''  # Variable to store the text prompt

async def upload_text(text_prompt):
    global uploaded_text_path
    filename = f'text_prompt.txt'
    uploaded_text_path = os.path.join(upload_dir, filename)
    with open(uploaded_text_path, "w") as text_file:
        text_file.write(text_prompt)
    return JSONResponse(content={"status": "OK"})

async def retrieve_text():
    global uploaded_text_path
    if not uploaded_text_path or not os.path.exists(uploaded_text_path):
        raise HTTPException(status_code=404, detail="Text prompt not found")
    with open(uploaded_text_path, "r") as text_file:
        text_prompt = text_file.read()
    return JSONResponse(content={"textPrompt": text_prompt})
