import os
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI  # type: ignore

from controllers import financials_controller, payment_controller
from views import company_view, investor_relations_view, user_view

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

chapa = os.getenv

app = FastAPI()

app.include_router(user_view.router)
app.include_router(investor_relations_view.router)
app.include_router(company_view.router)

# Payment Route
app.include_router(payment_controller.router)
app.include_router(payment_controller.router)

# Financial Data
app.include_router(financials_controller.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
