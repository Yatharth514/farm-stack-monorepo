from pydantic import BaseModel

class Todo(BaseModel):
    task: str

class TodoResponse(BaseModel):
    id: str
    task: str