# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv

# load_dotenv()

# MONGO_URI = os.getenv("MONGO_URI")

# client = MongoClient(MONGO_URI)
# db = client["mindmirror_db"]

# users_collection = db["users"]
# journals_collection = db["journals"]



from pymongo import MongoClient
import os
import certifi
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(
    MONGO_URI,
    tlsCAFile=certifi.where()
)

db = client["mindmirror_db"]

users_collection = db["users"]
journals_collection = db["journals"]