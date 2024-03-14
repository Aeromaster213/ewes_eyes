# image_processing_service.py

import os
import shutil
import time
from src.utils import lib, image_utils
from PIL import Image
from src.main import get_loaded_model

async def resize_image(image_path, output_file_path, width, height):
    try:
        image = Image.open(image_path)
        resized_image = image.resize((width, height))
        resized_image.save(output_file_path)
        print('Image resized successfully.')
    except Exception as e:
        print(f'Error resizing image: {e}')
        raise e
    

async def generate_color_palette(image_path):
    # hello
    image = Image.open(image_path)
    result = lib.k_means(image, 4)
    return result

async def generate_image(image_path, text_prompt):
    # hello
    return image_utils.predict(get_loaded_model(), image_path, text_prompt)





    


