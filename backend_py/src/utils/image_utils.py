from diffusers import DiffusionPipeline
from diffusers.utils import load_image
import torch

def load_model():
    pipe = DiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-2-1-unclip-small", 
        torch_dtype=torch.float16)
    pipe.to("cuda")
    return pipe

def predict(pipe, img_src, text):
    image = load_image(img_src)
    return pipe(image, "Draw me a GUI that "+text).images[0]