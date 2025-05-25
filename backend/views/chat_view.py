from fastapi import APIRouter, Body
from controllers.chat_controller import chat_about_company

router = APIRouter()

@router.post("/chat")
async def ask_company_chat(
    company_id: str = Body(...),
    question: str = Body(...)
):
    return await chat_about_company(company_id, question)
