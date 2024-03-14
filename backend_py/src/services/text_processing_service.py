# text_processing_service.py

import os

upload_dir = os.path.join(os.path.dirname(__file__), '../../public/uploads')

async def get_text_prompt():
    text_prompt_path = os.path.join(upload_dir, 'text_prompt.txt')
    if not os.path.exists(text_prompt_path):
        return None  # Or raise an exception if necessary
    with open(text_prompt_path, "r") as text_file:
        text_prompt = text_file.read()
    return text_prompt
