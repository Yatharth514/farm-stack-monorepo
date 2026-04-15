from fastapi import HTTPException
from database import db
from utils.password_hash import hash_password
from models.user_model import UserRegister
from utils.password_hash import verify_password
from models.user_model import UserLogin
from utils.jwt_handler import create_access_token

users_collection = db["users"]

def register_user_service(user: UserRegister):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)

    new_user = {
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(new_user)

    return {"message": "User registered successfully"}

def verify_user_service(user: UserLogin):
    existing_user = users_collection.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User does not exist")

    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Wrong password")

    token = create_access_token({"user_id": str(existing_user["_id"])})
    return {
        "access_token": token,
        "token_type": "bearer"
    }
