# Backend - FastAPI Server

This directory contains the FastAPI backend server that gets packaged as a standalone executable and launched as a subprocess by the Electron frontend.

## Development Setup

### Prerequisites

1. **Activate Virtual Environment:**

   ```bash
   venv\Scripts\activate
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Building the Executable

Every time you want to update the `main.exe` executable after making changes to `main.py`, run:

```bash
pyinstaller --windowed main.py
```

This will:

- Create a windowed executable (no console window)
- Generate the executable in `dist/main/main.exe`
- Bundle all Python dependencies
- Configure the server for subprocess execution

## API Endpoints

- `GET /` - Returns `{"message": "Hello World"}`

## Configuration

The FastAPI server is configured with:

- **CORS enabled** - Allows requests from Electron frontend
- **Host:** `0.0.0.0`
- **Port:** `8000`
- **Windowed mode** - No console output when run as executable
- **Simplified logging** - Compatible with PyInstaller

## Integration Notes

- The executable is automatically started by the Electron frontend
- Server runs silently in the background
- Process is automatically terminated when Electron app closes
- Built-in error handling for subprocess management

## Development vs Production

**Development:** Run directly with Python:

```bash
python main.py
```

**Production:** The Electron app launches the built executable automatically.
