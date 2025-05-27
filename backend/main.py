import os
from pathlib import Path
import uvicorn
from controllers import financials_controller, payment_controller
from dotenv import load_dotenv
from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware
from views import company_view, investor_relations_view, user_view, graph_view, investment_view, performance_view, capital_view, investor_view, roi_view, chat_view, snap_view, dashboard_view

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

chapa = os.getenv

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_view.router)
app.include_router(investor_relations_view.router)
app.include_router(company_view.router)

# Payment Route
app.include_router(payment_controller.router)

# Financial Data
app.include_router(financials_controller.router)
app.include_router(graph_view.router)
app.include_router(investment_view.router)
app.include_router(performance_view.router)
app.include_router(capital_view.router)
app.include_router(investor_view.router)
app.include_router(roi_view.router)
app.include_router(chat_view.router)
app.include_router(snap_view.router)
app.include_router(dashboard_view.router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
