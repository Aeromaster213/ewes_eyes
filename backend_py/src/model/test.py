from diffusers import DiffusionPipeline
from diffusers.utils import load_image
import torch

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1-unclip-small", torch_dtype=torch.float16)
pipe.to("cuda")

# get image
url = "https://huggingface.co/datasets/hf-internal-testing/diffusers-images/resolve/main/stable_unclip/tarsila_do_amaral.png"
image = load_image(url)

# run image variation
image = pipe(image).images[0]
