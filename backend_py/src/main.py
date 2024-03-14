# main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from src.utils import image_utils 

# Load environment variables from .env file
load_dotenv()

# Load the ML model
model = image_utils.load_model()  # Call the load_model function

# Function to create and return FastAPI app
def create_app():
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

    # Import and use routing files
    from src.routes import image_routes, text_routes  # Import your routes

    # Mount the image routes under the '/api' prefix
    app.include_router(image_routes.router, prefix="/api")

    # Mount the text routes under the '/api' prefix
    app.include_router(text_routes.router, prefix="/api")

    return app


# Function to get the loaded model
def get_loaded_model():
    return model


# Run the FastAPI server
if __name__ == "__main__":
    __spec__ = None
    app = create_app()
    backend_port = int(os.getenv("BACKEND_PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=backend_port, reload=True)
