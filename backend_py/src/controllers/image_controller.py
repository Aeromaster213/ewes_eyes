# image_controller.py

import os
import time
import asyncio
from fastapi import HTTPException, Response
from fastapi.responses import JSONResponse, FileResponse
from src.services import image_processing_service
from src.services import text_processing_service
import numpy as np

upload_dir = os.path.join(os.path.dirname(__file__), '../../public/uploads')
download_dir = os.path.join(os.path.dirname(__file__), '../../public/downloads')

current_image_path = ''  # Variable to store the current image path
updated_image_file = ''  # Variable to store the updated image filename


uploaded_image_path = ''  # Variable to store the uploaded image path
text_prompt = ''  # Variable to store the text prompt
input_colors = []  # Variable to store the input colors
generated_image_path = ''  # Variable to store the generated image path
generated_image = None  # Variable to store the generated image

new_colors = []  # Variable to store the new colors

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
    input_colors = await image_processing_service.generate_color_palette(uploaded_image_path)
    while not input_colors:
        await asyncio.sleep(1)  # Wait until input colors are available

    # Convert NumPy arrays to nested lists
    input_colors = [color.tolist() for color in input_colors]

    print("Input colors :", input_colors)
    print("Input colors type : " , type(input_colors))
    #colors = [[134, 120, 120], [234,0,0], [178, 67, 90], [0,0,0]]
    #colors = colors.tolist() if isinstance(colors, np.ndarray) else colors
    #return JSONResponse(content={"inputColors": colors})
    return {"inputColors": input_colors}
    

async def get_generated_image():
    global generated_image_path, generated_image
    await process_image()
    while not generated_image:
        await asyncio.sleep(1)  # Wait until generated image is available

    generated_image_path = os.path.join(download_dir, 'generated_image.jpg')  # Assuming it's a JPEG image
    generated_image.save(generated_image_path)

    # Read the saved image and return it as bytes
    with open(generated_image_path, 'rb') as f:
        image_bytes = f.read()

    # Determine the media type based on the file extension
    media_type = "image/jpeg" if generated_image_path.endswith(".jpg") else "image/png"
    return Response(content=image_bytes, media_type=media_type)

async def process_image():
    global input_colors, generated_image, text_prompt
    text_prompt = await text_processing_service.get_text_prompt()
    input_colors = await image_processing_service.generate_color_palette(uploaded_image_path)
    generated_image = await image_processing_service.generate_image(uploaded_image_path, text_prompt)


async def update_image_color(color_values):
    global new_colors
    if not color_values:
        raise HTTPException(status_code=400, detail="Color values are required")

    # Extract the colors list from the dictionary
    colors_list = color_values.get("colors")
    if not colors_list:
        raise HTTPException(status_code=400, detail="Colors list is missing or empty")

    # Process each color in the list
    colors = []
    for color in colors_list:
        r = color.get("r", 0)
        g = color.get("g", 0)
        b = color.get("b", 0)
        colors.append([r, g, b])

    print("Colors:", colors)
    new_colors = colors
    return JSONResponse(content={"status": "OK"})
    

async def get_updated_image():
    input_colors = await image_processing_service.generate_color_palette(uploaded_image_path)
    if not input_colors:
        raise HTTPException(status_code=400, detail="Input colors are required")
    
    #generated_image_path = uploaded_image_path  # Assuming the generated image is the same as the uploaded image for testing

    if not generated_image_path:
        raise HTTPException(status_code=400, detail="Generated image is not available")

    modified_image_bytes = await image_processing_service.modify_image(
        colors=new_colors,
        input_colors=input_colors,
        generated_image_path=generated_image_path
    )

    return Response(content=modified_image_bytes, media_type="image/jpeg")

