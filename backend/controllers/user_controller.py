from datetime import datetime

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from model.user_model import User
from services.hashing import hash_password, verify_password
from services.jwt import create_access_token


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(
    db: Session,
    first_name: str,
    last_name: str,
    email: str,
    username: str,
    password: str,
):
    existing_user = (
        db.query(User)
        .filter((User.email == email) | (User.username == username))
        .first()
    )
    if existing_user:
        raise ValueError("Email or username already in use")

    # Hash the password
    hashed_password = hash_password(password)

    # Create a new user
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not user.password:
        raise HTTPException(status_code=400, detail="This user must log in with Google")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user.email})

    return {
        "accessToken": access_token,
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "isUpgraded": user.is_upgraded,
    }


def get_current_db_time(db: Session) -> datetime:
    return db.execute(select(func.now())).scalar_one()


def update_user_subscription_status(user: User, db: Session, status: bool) -> User:
    user.is_upgraded = status
    db.commit()
    db.refresh(user)

    return user
