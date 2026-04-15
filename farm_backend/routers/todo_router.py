from fastapi import APIRouter, HTTPException,Depends,Query
from bson import ObjectId
from utils.helpers import validate_object_id
from models.todo_model import Todo, TodoResponse
from services.todo_service import create_todo_service,get_todo_service,delete_todo_service,update_todo_service,get_todos_service
from database import todos_collection
from utils.auth_dependency import get_current_user


router = APIRouter(prefix="/todos", tags=["Todos"])

@router.get("/")
def get_todos(page: int = Query(1 , ge=1),limit: int = Query(10 , le=100),user_id: str = Depends(get_current_user)):
    return get_todos_service(page,limit,user_id)

@router.post("/", response_model=TodoResponse)
def create_todo(todo: Todo,user_id: str=Depends(get_current_user)):
    return create_todo_service(todo,user_id)

@router.get("/{id}")
def get_todo(id:str ,user_id: str=Depends(get_current_user)):
    return get_todo_service(id,user_id)

@router.delete("/{id}")
def delete_todo(id:str ,user_id: str=Depends(get_current_user)):
    return delete_todo_service(id,user_id)

@router.patch("/{id}")
def update_todo(id:str, updated_todo: Todo, user_id: str=Depends(get_current_user)):
    return update_todo_service(id,updated_todo,user_id)