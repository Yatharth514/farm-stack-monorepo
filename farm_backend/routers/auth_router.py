from fastapi import APIRouter
from models.user_model import UserRegister,UserLogin
from services.auth_service import register_user_service,verify_user_service

router=APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/register")
def register_user(user: UserRegister): 
    return register_user_service(user)

@router.post("/login")
def login_user(user: UserLogin):
    return verify_user_service(user)