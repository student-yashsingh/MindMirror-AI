# from fastapi import APIRouter, HTTPException, Depends
# from fastapi.security import OAuth2PasswordRequestForm
# from pydantic import BaseModel
# from database import users_collection
# from auth import hash_password, verify_password, create_access_token

# from google.oauth2 import id_token
# from google.auth.transport import requests
# import os

# router = APIRouter()


# GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


# # Models
# class UserRegister(BaseModel):
#     username: str
#     email: str
#     password: str


# class GoogleLoginRequest(BaseModel):
#     token: str


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



# # Login Route
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



# # Google Login Route
# @router.post("/google-login")
# def google_login(data: GoogleLoginRequest):

#     try:

#         idinfo = id_token.verify_oauth2_token(
#             data.token,
#             requests.Request(),
#             GOOGLE_CLIENT_ID
#         )

#         email = idinfo["email"]
#         name = idinfo.get("name", "Google User")

#         db_user = users_collection.find_one({"email": email})

#         if not db_user:

#             user_id = users_collection.insert_one({
#                 "username": name,
#                 "email": email,
#                 "password": None
#             }).inserted_id

#         else:
#             user_id = db_user["_id"]


#         access_token = create_access_token({
#             "user_id": str(user_id)
#         })

#         return {
#             "access_token": access_token,
#             "token_type": "bearer"
#         }

#     except ValueError:
#         raise HTTPException(status_code=400, detail="Invalid Google token")


from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database import users_collection
from auth import hash_password, verify_password, create_access_token

from google.oauth2 import id_token
from google.auth.transport import requests
import os

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


# ---------------- MODELS ---------------- #

class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class GoogleLoginRequest(BaseModel):
    token: str


# ---------------- REGISTER ---------------- #

@router.post("/register")
def register(user: UserRegister):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered. Please login."
        )

    hashed_pwd = hash_password(user.password)

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_pwd
    })

    return {"message": "User registered successfully"}


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    email = form_data.username
    password = form_data.password

    db_user = users_collection.find_one({"email": email})

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="User not found. Please register first."
        )

    if not verify_password(password, db_user["password"]):
        raise HTTPException(
            status_code=400,
            detail="Incorrect password"
        )

    access_token = create_access_token(
        {"user_id": str(db_user["_id"])}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------- GOOGLE LOGIN ---------------- #

@router.post("/google-login")
def google_login(data: GoogleLoginRequest):

    try:

        idinfo = id_token.verify_oauth2_token(
            data.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]

        db_user = users_collection.find_one({"email": email})

        # Do NOT auto-create user
        if not db_user:
            raise HTTPException(
                status_code=400,
                detail="Google account not registered. Please sign up first."
            )

        access_token = create_access_token({
            "user_id": str(db_user["_id"])
        })

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")