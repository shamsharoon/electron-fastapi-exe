# Electron + FastAPI Integrated Application

A full-stack desktop application that combines an Electron frontend with a FastAPI backend, packaged as a single executable.

## 🏗️ Architecture Overview

This application consists of two main components:

- **Frontend**: Electron-based desktop application (React UI)
- **Backend**: FastAPI server packaged as a standalone executable

The Electron app automatically starts the FastAPI backend as a subprocess, creating a seamless desktop experience with a web API backend.

## 📁 Project Structure

```
test/
├── frontend/                 # Electron frontend application
│   ├── src/
│   │   ├── main/index.js    # Main Electron process with subprocess management
│   │   ├── renderer/        # React frontend components
│   │   └── preload/         # Electron preload scripts
│   ├── electron-builder.yml # Build configuration
│   └── package.json         # Frontend dependencies and scripts
│
├── backend/                  # FastAPI backend server
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── dist/main/main.exe   # Built backend executable
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js and npm
- Python 3.12+ with pip
- Windows (for building .exe)

### 1. Setup Backend

```bash
cd backend
# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Build backend executable
pyinstaller --windowed main.py
```

### 2. Setup Frontend

```bash
cd frontend
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build:win  # Windows
npm run build:mac  # macOS
npm run build:linux  # Linux
```

## 🔧 Development Workflow

### Backend Changes

1. Modify `backend/main.py`
2. Activate virtual environment: `venv\Scripts\activate`
3. Rebuild executable: `pyinstaller --windowed main.py`
4. Test with frontend

### Frontend Changes

1. Modify files in `frontend/src/`
2. For subprocess/bundling changes, edit `frontend/src/main/index.js`
3. Test with: `npm run dev`
4. Build with: `npm run build:win`

## 📦 Distribution

The final build creates a single `.exe` file that contains:

- Electron frontend application
- FastAPI backend executable
- All necessary dependencies

Users only need to run the single executable - no additional setup required!

## 🌐 API Integration

The frontend automatically connects to the backend running on `localhost:8000`. The React app:

- Shows "hello!" initially
- Fetches from the FastAPI backend using `useEffect`
- Displays "Hello World" when connected
- Falls back gracefully if backend is unavailable

## 🔧 Configuration

### Backend API (`localhost:8000`)

- `GET /` - Returns `{"message": "Hello World"}`
- CORS enabled for Electron frontend
- Configured for windowed subprocess execution

### Frontend Features

- Automatic backend process management
- Process cleanup on app exit
- Error handling and graceful fallback
- Content Security Policy configured for API access

## 📚 Documentation

- [Frontend README](frontend/README.md) - Electron app configuration and building
- [Backend README](backend/README.md) - FastAPI server development and packaging

## 🛠️ Troubleshooting

**Build fails with symbolic link errors:**

- Run terminal as Administrator, or
- Enable Windows Developer Mode, or
- Add `sign: false` to `electron-builder.yml`

**Backend not starting:**

- Ensure `backend/dist/main/main.exe` exists
- Check that backend builds without errors
- Verify paths in `frontend/src/main/index.js`

**Frontend can't connect to backend:**

- Check Content Security Policy in `frontend/src/renderer/index.html`
- Ensure CORS is configured in `backend/main.py`
- Verify backend is running on port 8000
