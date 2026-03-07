from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from database import users_collection
from auth import hash_password, verify_password, create_access_token,get_current_user
from bson import ObjectId

from google.oauth2 import id_token
from google.auth.transport import requests
import os

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


# ---------------- MODELS ---------------- #

class ChangePassword(BaseModel):
    old_password: str
    new_password: str


@router.put("/change-password")
def change_password(data: ChangePassword, current_user=Depends(get_current_user)):

    db_user = users_collection.find_one({"_id": current_user["_id"]})

    if not verify_password(data.old_password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect old password")

    new_hashed = hash_password(data.new_password)

    users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"password": new_hashed}}
    )

    return {"message": "Password updated successfully"}



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
    
    
    
@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"]
    }
    
    
    
    
@router.delete("/delete-account")
def delete_account(current_user=Depends(get_current_user)):

    users_collection.delete_one({"_id": current_user["_id"]})

    return {"message": "Account deleted"}