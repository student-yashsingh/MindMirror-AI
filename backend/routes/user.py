# from fastapi import APIRouter, HTTPException, Depends
# from fastapi.security import OAuth2PasswordRequestForm
# from pydantic import BaseModel
# from database import users_collection, journals_collection
# from auth import hash_password, verify_password, create_access_token, get_current_user
# from bson import ObjectId
# from datetime import datetime

# router = APIRouter()


# # Models


# class UserRegister(BaseModel):
#     username: str
#     email: str
#     password: str


# class JournalEntry(BaseModel):
#     content: str



# # Register Route


# @router.post("/register")
# def register(user: UserRegister):

#     if users_collection.find_one({"email": user.email}):
#         raise HTTPException(status_code=400, detail="Email already exists")

#     hashed_pwd = hash_password(user.password)

#     users_collection.insert_one({
#         "username": user.username,
#         "email": user.email,
#         "password": hashed_pwd
#     })

#     return {"message": "User registered successfully"}



# # Login Route (OAuth2)


# @router.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):

#     email = form_data.username
#     password = form_data.password

#     db_user = users_collection.find_one({"email": email})

#     if not db_user:
#         raise HTTPException(status_code=400, detail="Invalid email")

#     if not verify_password(password, db_user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid password")

#     access_token = create_access_token(
#         {"user_id": str(db_user["_id"])}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }



# # Protected Journal Route


# @router.post("/journal")
# def create_journal(entry: JournalEntry, user=Depends(get_current_user)):

#     journal_data = {
#         "user_id": ObjectId(user["user_id"]),
#         "content": entry.content,
#         "created_at": datetime.utcnow()
#     }

#     journals_collection.insert_one(journal_data)

#     return {
#         "message": "Journal saved successfully",
#         "user_id": user["user_id"]
#     }



from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database import users_collection
from auth import hash_password, verify_password, create_access_token

router = APIRouter()


# Models
class UserRegister(BaseModel):
    username: str
    email: str
    password: str


# Register Route
@router.post("/register")
def register(user: UserRegister):

    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pwd = hash_password(user.password)

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_pwd
    })

    return {"message": "User registered successfully"}


# Login Route
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    email = form_data.username
    password = form_data.password

    db_user = users_collection.find_one({"email": email})

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if not verify_password(password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid password")

    access_token = create_access_token(
        {"user_id": str(db_user["_id"])}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }