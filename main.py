from fastapi import FastAPI # type: ignore
from views import user_view

app = FastAPI()

app.include_router(user_view.router)
