# image_processing_service.py

import os
import shutil
import time
from PIL import Image

async def resize_image(image_path, output_file_path, width, height):
    try:
        image = Image.open(image_path)
        resized_image = image.resize((width, height))
        resized_image.save(output_file_path)
        print('Image resized successfully.')
    except Exception as e:
        print(f'Error resizing image: {e}')
        raise e
