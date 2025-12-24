# QR Code Generator 🎯

A modern, full-stack QR Code generator application built with Next.js and FastAPI. Generate QR codes from any URL with cloud storage and database persistence.

**Live Demo:** [https://qr-generatorqr.netlify.app/](https://qr-generatorqr.netlify.app/)

## 🚀 Features

- ✨ **Instant QR Code Generation** - Generate QR codes from any URL in seconds
- 🎨 **Modern UI** - Clean, dark-themed interface with smooth animations
- 💾 **Cloud Storage** - QR codes stored securely in Cloudinary
- 🗄️ **Database Persistence** - Metadata saved in MongoDB
- 📥 **One-Click Download** - Download QR codes instantly
- 🐳 **Fully Containerized** - Docker and Docker Compose support

## 🏗️ Architecture

**Frontend:** Next.js 14 application with React hooks and Axios for API calls  
**Backend:** FastAPI with async MongoDB driver (Motor) and Cloudinary integration  
**Storage:** Cloudinary for QR code images  
**Database:** MongoDB for storing URL and QR code metadata

## 📁 Project Structure

```
devops-qr-code/
├── api/                          # FastAPI backend
│   ├── main.py                   # API application with endpoints
│   ├── test_main.py              # API tests
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile                # Backend container config
│   └── .env                      # Environment variables (not committed)
├── front-end-nextjs/             # Next.js frontend
│   ├── src/
│   │   └── app/
│   │       ├── page.js           # Main QR generator page
│   │       ├── layout.js         # App layout
│   │       └── globals.css       # Global styles
│   ├── Dockerfile                # Frontend container config
│   ├── package.json              # Node dependencies
│   ├── next.config.js            # Next.js configuration
│   └── .env                      # Environment variables (not committed)
├── docker-compose.yaml           # Docker Compose orchestration
└── README.md                     # This file
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Python 3.11+** - Programming language
- **FastAPI** - High-performance async web framework
- **Motor** - Async MongoDB driver
- **Cloudinary SDK** - Cloud storage integration
- **QRCode** - QR code generation library
- **Uvicorn** - ASGI server

### DevOps & Infrastructure

- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **MongoDB** - NoSQL database
- **Cloudinary** - Cloud storage service

## 🚀 Quick Start

### Running with Docker Compose

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd devops-qr-code
   ```

2. **Set up environment variables**

   Create `.env` in the `api` directory:

   ```env
   MONGO_URL=mongodb://localhost:27017
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Create `.env` in the `front-end-nextjs` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start the application**

   ```bash
   docker-compose up
   ```

4. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)

### Running Locally (Development)

#### Backend Setup

1. **Navigate to API directory**

   ```bash
   cd api
   ```

2. **Create and activate virtual environment**

   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file**

   ```env
   MONGO_URL=mongodb://localhost:27017
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Run the API server**
   ```bash
   uvicorn main:app --reload
   ```
   Server runs at: [http://localhost:8000](http://localhost:8000)

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd front-end-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Server runs at: [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Commands

### Build individual containers

```bash
# Build backend
cd api
docker build -t qr-api .

# Build frontend
cd front-end-nextjs
docker build -t qr-frontend .
```

### Run individual containers

```bash
# Run backend
docker run -p 8000:8000 --env-file ./api/.env qr-api

# Run frontend
docker run -p 3000:3000 --env-file ./front-end-nextjs/.env qr-frontend
```

### Docker Compose commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d
```

## 🎯 Usage

1. **Open the application** in your browser at [http://localhost:3000](http://localhost:3000)
2. **Enter a URL** in the input field (e.g., `https://example.com`)
3. **Click "Generate QR Code"** - an animated spinner will show during generation
4. **View the QR code** displayed on the screen
5. **Download** the QR code by clicking the "Download QR Code" button

## 🌟 Key Features Explained

### Cloud Storage Integration

All generated QR codes are automatically uploaded to Cloudinary, ensuring fast delivery and reliable storage without local file system dependencies.

### Database Persistence

Metadata (original URL and Cloudinary URL) is stored in MongoDB for future reference and analytics.


## 🚢 Deployment

### Current Deployments

- **Frontend:** Netlify - [https://qr-generatorqr.netlify.app/](https://qr-generatorqr.netlify.app/)
- **Backend:** Render

### Docker Images

Pre-built Docker images are available:

- Frontend: `puleena/docker-project-for-prac-frontend`
- Backend: `puleena/docker-project-for-prac`

## 🙏 Acknowledgments

- FastAPI for the excellent async framework
- Next.js for the powerful React framework
- Cloudinary for reliable cloud storage
- MongoDB for flexible data storage

---

**Built with ❤️ for learning DevOps practices including Containerization, CI/CD, and Cloud Deployment**
