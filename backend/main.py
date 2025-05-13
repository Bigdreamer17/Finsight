import uvicorn
from fastapi import FastAPI  # type: ignore

from views import company_view, investor_relations_view, user_view

app = FastAPI()

app.include_router(user_view.router)
app.include_router(investor_relations_view.router)
app.include_router(company_view.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)
