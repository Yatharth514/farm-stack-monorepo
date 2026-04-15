from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL,tlsCAFile=certifi.where())

db = client["todo_app"]

todos_collection = db["todos"]
users_collection = db["users"]

todos_collection.create_index("user_id")

print("Connected to MongoDB successfully")
