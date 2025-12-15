# QR-Generator

Live Demo - https://qr-generatorqr.netlify.app/

It generates QR Codes for the provided URL, the front-end is in NextJS and the API is written in Python using FastAPI.

## Application

**Front-End** - A web application where users can submit URLs.

**API**: API that receives URLs and generates QR codes. The API stores the QR code images in cloud storage(Cloudinary) and meta data of image in MongoDB.

## Running locally

### API

The API code exists in the `api` directory. You can run the API server locally:

- Clone this repo
- Make sure you are in the `api` directory
- Create a virtualenv by typing in the following command: `python -m venv .venv`
- activate env `.venv\Scripts\Activate.ps1`
- Install the required packages: `pip install -r requirements.txt`
- Create a `.env` file, and add you AWS Access and Secret key, check `.env.example`
- Also, change the BUCKET_NAME to your S3 bucket name in `main.py`
- Run the API server: `uvicorn main:app --reload`
- Your API Server should be running on port `http://localhost:8000`

### Front-end

The front-end code exits in the `front-end-nextjs` directory. You can run the front-end server locally:

- Clone this repo
- Make sure you are in the `front-end-nextjs` directory
- Install the dependencies: `npm install`
- Run the NextJS Server: `npm run dev`
- Your Front-end Server should be running on `http://localhost:3000`

## Goal

The goal is to get hands-on with DevOps practices like Containerization, CICD and monitoring.

## Tech Stack

### Front-end

- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language

### Back-end

- **Python** - Programming language
- **FastAPI** - Modern web framework for building APIs
- **Cloudinary** - Cloud storage for QR code images
- **MongoDB** - NoSQL database for metadata storage

### DevOps

- **Docker** - Containerization
- **Netlify** - Front-end deployment (current)
- **Render** - Back-end deployment (current)
- **CI/CD** - Continuous Integration/Continuous Deployment pipelines

## Docker Deployment

### Running with Docker

Both the API and front-end can be containerized using Docker.

#### API Docker Setup

```bash
cd api
docker build -t qr-api .
docker run -p 8000:8000 --env-file .env qr-api
```

#### Front-end Docker Setup

```bash
cd front-end-nextjs
docker build -t qr-frontend .
docker run -p 3000:3000 qr-frontend
```

## Environment Variables

### API (.env)

Create a `.env` file in the `api` directory with the following variables:

```env
# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=qr_generator

# Optional
PORT=8000
```

### Front-end (.env.local)

Create a `.env.local` file in the `front-end-nextjs` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing

### API Tests

Run the API tests using pytest:

```bash
cd api
pytest test_main.py -v
```

## Project Structure

```
devops-qr-code/
├── api/                    # FastAPI backend
│   ├── main.py            # Main API application
│   ├── test_main.py       # API tests
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # API container configuration
├── front-end-nextjs/      # Next.js frontend
│   ├── src/               # Source files
│   │   └── app/          # Next.js app directory
│   ├── Dockerfile         # Frontend container configuration
│   ├── package.json       # Node dependencies
│   └── next.config.js     # Next.js configuration
└── README.md
```

## Features

- ✅ Generate QR codes from URLs
- ✅ Store QR codes in cloud storage (Cloudinary)
- ✅ Save metadata in MongoDB
- ✅ Responsive web interface
- ✅ RESTful API
- ✅ Containerized deployment
- ✅ Fast and efficient

## API Endpoints

### `POST /generate-qr`

Generate a QR code for a given URL.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "qr_code_url": "https://cloudinary.com/...",
  "original_url": "https://example.com",
  "created_at": "2025-12-15T10:30:00Z"
}
```
