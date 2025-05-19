import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from pydantic import BaseModel
from sqlalchemy.orm import Session

from controllers.user_controller import (create_user, get_current_db_time,
                                         get_user_by_email,
                                         update_user_subscription_status)
from db.database import get_db
from services.jwt import create_access_token

router = APIRouter(tags=["User"])

# Load environment variables from .env file
load_dotenv()

# Load config from environment
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


# Pydantic schema to validate the incoming request data
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str
    is_upgraded: Optional[bool] = False

    class Config:
        orm_mode = True


class GoogleAuth(BaseModel):
    token: str


@router.post("/signup")
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    try:
        created_user = create_user(
            db=db,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            username=user.username,
            password=user.password,
            is_upgraded=user.is_upgraded,
        )

        return {
            "id": created_user.id,
            "username": created_user.username,
            "email": created_user.email,
            "first_name": created_user.first_name,
            "last_name": created_user.last_name,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/signin/google")
def google_auth(payload: GoogleAuth, db: Session = Depends(get_db)):
    try:
        # Verify the token
        id_info = id_token.verify_oauth2_token(
            payload.token, google_requests.Request(), audience=GOOGLE_CLIENT_ID
        )

        # Extract user info
        email = id_info.get("email")
        first_name = id_info.get("given_name", "")
        last_name = id_info.get("family_name", "")
        username = email.split("@")[0]

        if not email:
            raise HTTPException(status_code=400, detail="Email not found in token")

        # Check if user exists
        user = get_user_by_email(db, email)

        if not user:
            user = create_user(
                db=db,
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                password="",
            )

        current_time = get_current_db_time(db=db)

        if user.subscription_end_date < current_time and user.is_upgraded:
            user = update_user_subscription_status(user=user, db=db, status=False)

        access_token = create_access_token(data={"sub": user.email})

        return {
            "accessToken": access_token,
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "isUpgraded": user.is_upgraded,
            "subscriptionEndDate": user.subscription_end_date,
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid token")
