# 🏏 Indian Cricketer Face Identification & Analytics Platform

An AI-powered fullstack web application with a **Glassmorphism Dark Mode UI**, **FaceNet Deep Learning model**, **REST API Backend**, and **Database Logging** for recognizing Indian Cricket Team players.

---

## 🌟 Key Features

1. **Futuristic Glassmorphism UI (React + Vite)**
   - Translucent frosted glass containers with backdrop filters, cyan/purple glowing accents.
   - Interactive drag-and-drop face image dropzone with laser scanner animation.
   - Live bounding box overlay displaying identified player name and confidence score.
2. **REST API Backend & Persistence**
   - Endpoints for prediction (`POST /api/predict`), target squad roster (`GET /api/players`), database logs (`GET /api/history`), and platform stats (`GET /api/stats`).
   - SQLite database logging every scan with execution latency, timestamps, and confidence metrics.
3. **8 Target Indian Cricketers**
   - Virat Kohli, Rohit Sharma, Jasprit Bumrah, Hardik Pandya, KL Rahul, Shubman Gill, Ravindra Jadeja, Mohammed Shami.

---

## 🚀 Getting Started

### 1. Start the Backend Server (Port 8000)
```bash
cd backend
npm install
node server.js
```

### 2. Start the Frontend Application (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

Open your browser and visit: `http://localhost:5173`

---

## 📁 Repository Structure
- `frontend/` - React + Vite Glassmorphism Web App (`App.jsx`, `index.css`, `components/`)
- `backend/` - REST API & Database server (`server.js`, `database.json`, `app/`)
- `src/` - Python Deep Learning scripts (`collect_data.py`, `preprocess.py`, `train.py`, `predict.py`)
- `docs/` - System SRS, Architecture diagrams, Project report, and PPT content.
