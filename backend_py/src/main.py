# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initializing FastAPI app
app = FastAPI()

# Set up CORS to allow requests from the frontend
frontend_port = int(os.getenv("FRONTEND_PORT", 3000))
app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"http://localhost:{frontend_port}"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

backend_port = int(os.getenv("BACKEND_PORT", 5000))

# Import and use routing files
from routes import image_routes  # Import your image routes

# Mount the image routes under the '/api' prefix
app.include_router(image_routes.router, prefix="/api")

# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=backend_port, reload=True)
