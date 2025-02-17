from model.user_model import User 
from services.hashing import hash_password
from sqlalchemy.orm import Session


def create_user(db: Session, first_name: str, last_name: str, email: str, username: str, password: str):

    existing_user = db.query(User).filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        raise ValueError("Email or username already in use")
    
    # Hash the password
    hashed_password = hash_password(password)

    print(f"Creating user: {username}, Email: {email}")


    # Create a new user
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
    

    
