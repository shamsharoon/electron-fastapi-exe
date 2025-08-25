from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Add CORS middleware to allow requests from Electron frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World from Vercel!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "FastAPI backend is running on Vercel"}

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, log_config=None)