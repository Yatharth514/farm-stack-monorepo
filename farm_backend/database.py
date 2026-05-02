from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    print("CRITICAL ERROR: MONGO_URL is not set in environment variables!")
else:
    # Print just the first few characters to verify it's being read
    print(f"MONGO_URL found starting with: {MONGO_URL[:15]}...")

try:
    client = MongoClient(MONGO_URL, tlsCAFile=certifi.where())
    # Force a connection check
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")

client = MongoClient(MONGO_URL,tlsCAFile=certifi.where())

db = client["todo_app"]

todos_collection = db["todos"]
users_collection = db["users"]

todos_collection.create_index("user_id")

print("Connected to MongoDB successfully")
