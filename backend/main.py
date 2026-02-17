from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import webhooks, dashboard

app = FastAPI(title="CAC Dashboard API")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enregistrement des routeurs
app.include_router(webhooks.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {"status": "FastAPI est opérationnel pour le Dashboard CAC"}