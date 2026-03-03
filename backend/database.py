# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv

# load_dotenv()

# MONGO_URL = os.getenv("MONGO_URL")

# client = MongoClient(MONGO_URL)

# db = client["mindmirror_db"]

# # These MUST exist
# users_collection = db["users"]
# journal_collection = db["journals"]



from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["mindmirror_db"]

users_collection = db["users"]
journals_collection = db["journals"]