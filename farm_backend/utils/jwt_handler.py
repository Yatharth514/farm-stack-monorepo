from jose import jwt ,JWTError
from fastapi import HTTPException
from datetime import datetime,timedelta,timezone
import os

SECRET_KEY="supersecretkey"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=60

def create_access_token(data: dict):
    to_encode=data.copy()

    expire=datetime.now(timezone.utc)+ timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp":expire})

    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

    return encoded_jwt

def verify_token(token: str):

    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
        user_id =payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401,detail="Invalid token")
        
        return user_id
    except JWTError:
        raise HTTPException(status_code=401,detail="Invalid or expired")

    
