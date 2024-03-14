from diffusers import DiffusionPipeline
from diffusers.utils import load_image
import torch

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1-unclip-small", torch_dtype=torch.float16)
pipe.to("cuda")

image = load_image("0.jpg")

image = pipe(image, "Draw me a GUI that has a dark color pallette").images[0]
