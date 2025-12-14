from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import qrcode
import os
from io import BytesIO
from motor.motor_asyncio import AsyncIOMotorClient
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Loading Environment variable (AWS Access Key and Secret Key)
from dotenv import load_dotenv
load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client.qr_db
collection = db.qr_codes

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

app = FastAPI()

# Allowing CORS for local testing
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-qr/")
async def generate_qr(url: str):

    # Generate QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    # Save image to memory
    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    # Upload to Cloudinary
    upload_result = cloudinary.uploader.upload(
        img_byte_arr,
        folder="qr_codes"
    )

    await collection.insert_one({"url": url, "qr_code_url": upload_result["secure_url"]})

    return {
        "message": f"QR Code generated successfully {url}",
        "qr_code_url": upload_result["secure_url"]
    }

    
@app.get("/")
async def root():
    return {"message": "QR Code Generator API is running."}

    