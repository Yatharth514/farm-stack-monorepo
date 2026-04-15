from database import todos_collection
from bson import ObjectId
from fastapi import HTTPException


def create_todo_service(todo, user_id):

    new_todo = {
        "task": todo.task,
        "user_id": user_id
    }

    result = todos_collection.insert_one(new_todo)

    return {
        "id": str(result.inserted_id),
        "task": todo.task
    }

def get_todo_service(id, user_id):
    todo=todos_collection.find_one({
        "_id":ObjectId(id),
        "user_id":user_id
    })
    if todo:
        return{
            "id":str(todo["_id"]),
            "task":todo["task"]
        }
    raise HTTPException(status_code=404,detail="Not found")

def delete_todo_service(id, user_id):
    result=todos_collection.delete_one({
        "_id":ObjectId(id),
        "user_id":user_id
    })
    if result.deleted_count==0:
        raise HTTPException(status_code=404, detail="Not Found")
    return {
        "message":"Todo Deleted"
    }

def update_todo_service(id, updated_todo, user_id):
    result=todos_collection.update_one({
        "_id":ObjectId(id),
        "user_id":user_id
    },{
        "$set": {"task":updated_todo.task}
    })
    if result.matched_count==0:
          raise HTTPException(status_code=404, detail="Not Found")
    return {
        "message":"The Todo is updated"
    }

def get_todos_service(page, limit, user_id):
    skip = ( page -1 ) * limit
    cursor=todos_collection.find({
        "user_id":user_id
    }).skip(skip).limit(limit)
    todos=[]
    for todo in cursor:
          todos.append({
               "id":str(todo["_id"]),
               "task":todo["task"]
          })

    return {
        "page": page,
        "limit":limit,
        "data":todos
    }

     
        
