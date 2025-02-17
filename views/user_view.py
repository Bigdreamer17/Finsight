from fastapi import APIRouter, Depends, HTTPException 
from sqlalchemy.orm import Session 
from pydantic import BaseModel 
from controllers.user_controller import create_user
from db.database import get_db


router = APIRouter()

# Pydantic schema to validate the incoming request data
class UserCreate(BaseModel):
    first_name:str
    last_name:str
    email:str
    username:str
    password:str

@router.post("/signup")
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    print("Received request for signup:", user)
    
    try:
        created_user = create_user(
            db=db,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            username=user.username,
            password=user.password
        )

        print("User created successfully:", created_user)
        
        return {"id": created_user.id, "username": created_user.username, "email": created_user.email, "first_name": created_user.first_name, "last_name": created_user.last_name}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))