# Frontend - Electron App

This directory contains the Electron frontend application that automatically starts and manages the FastAPI backend as a subprocess.

## Configuration

### Updating Bundling Configuration / Subprocesses

To update any bundling configuration or subprocess management, modify:

```
src/main/index.js
```

This file contains:

- Backend subprocess spawning logic
- Backend path configuration for development and production
- Process cleanup handlers
- Window management

### Packaging the Application

Packaging commands are defined in `package.json`. Use the appropriate command for your target platform:

**Windows:**

```bash
npm run build:win
```

**macOS:**

```bash
npm run build:mac
```

**Linux:**

```bash
npm run build:linux
```

**Development:**

```bash
npm run dev
```

## Build Process

The build process will:

1. Bundle the Electron frontend application
2. Include the FastAPI backend executable from `../backend/dist/main/`
3. Package everything into a single distributable executable

## Requirements

- Node.js and npm installed
- Backend executable must be built first (see `../backend/README.md`)

## Architecture

The Electron main process automatically:

- Starts the FastAPI backend on application launch
- Manages backend process lifecycle
- Cleans up backend process on application exit
- Provides graceful fallback if backend fails to start
