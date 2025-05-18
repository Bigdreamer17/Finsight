import supabase 
from services.hashing import hash_password, verify_password
from services.jwt import create_access_token
from fastapi import HTTPException

def get_user_by_email(email: str):
    response = supabase.table("users").select("*").eq("email", email).single().execute()
    return response.data

def create_user(user):
    # Check for existing email or username
    check = supabase.table("users").select("*").or_(f"email.eq.{user.email},username.eq.{user.username}").execute()
    if check.data:
        raise ValueError("Email or username already in use")

    hashed_password = hash_password(user.password)

    result = supabase.table("users").insert({
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "username": user.username,
        "password": hashed_password,
        "is_upgraded": False
    }).execute()

    return result.data[0]

def login_user(email: str, password: str):
    response = supabase.table("users").select("*").eq("email", email).single().execute()
    user = response.data

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not user.get("password"):
        raise HTTPException(status_code=400, detail="This user must log in with Google")

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user["email"]})

    return {
        "accessToken": access_token,
        "id": user["id"],
        "email": user["email"],
        "username": user["username"],
        "firstName": user["first_name"],
        "lastName": user["last_name"],
        "isUpgraded": user["is_upgraded"],
    }