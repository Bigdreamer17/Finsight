from fastapi import APIRouter, Body, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from controllers.chat_controller import chat_about_company, get_chat
from controllers.user_controller import get_user_by_email
from db.database import get_db
from services.jwt import get_current_user

router = APIRouter(prefix="/chat", tags=["Chats"])


@router.post("")
async def ask_company_chat(
    request: Request, company_id: str = Body(...), question: str = Body(...)
):
    user_sub = get_current_user(request)
    user_email = user_sub["sub"]

    return await chat_about_company(company_id, question, user_email)


@router.get("/{company_id}")
def get_chat_histroy(company_id: str, request: Request, db: Session = Depends(get_db)):
    user_sub = get_current_user(request)
    user_email = user_sub["sub"]

    user = get_user_by_email(db=db, email=user_email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return get_chat(company_id=company_id, user_id=UUID(str(user.id)), db=db)
