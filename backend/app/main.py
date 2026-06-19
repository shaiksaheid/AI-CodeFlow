from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.database.db import engine
from app.database.models import Base
from app.routes.ml import router as ml_router
from app.routes.code_classifier import router as code_router
from app.routes.ai import router as ai_router
from app.routes import google_auth
from app.routes.flowchart import router as flowchart_router
from app.routes.google_auth import router as google_router
from app.routes import flowchart


app = FastAPI(
    title="AI CodeFlow API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI CodeFlow Backend Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


app.include_router(google_auth.router)

app.include_router(auth_router)


app.include_router(ml_router)

app.include_router(code_router)

app.include_router(ai_router)

app.include_router(flowchart_router)


app.include_router(flowchart.router)

Base.metadata.create_all(bind=engine)