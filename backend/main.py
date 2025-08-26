from datetime import datetime
from tokenize import ContStr
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel, Field

class Message(BaseModel):
    id: int = Field(..., description="The unique identifier for the message")
    content: str = Field(..., description="The content of the message")
    created_at: datetime = Field(..., description="The timestamp when the message was created")



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #only let certain domains access the backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

messages = [
    Message(id=1, content="hello!", created_at=datetime.now()),
    Message(id=2, content="how are you?", created_at=datetime.now()),
    Message(id=3, content="what's up?", created_at=datetime.now()),
    Message(id=4, content="goodbye!", created_at=datetime.now()),
    Message(id=5, content="see you later!", created_at=datetime.now()),
]

@app.get("/")
def read_root():
    return {"message": "Hello World from Vercel!"}

@app.get("/api/v1/messages")
def get_messages():
    return {"messages": messages}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "FastAPI backend is running on Vercel"}

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, log_config=None)