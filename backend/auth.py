# from passlib.context import CryptContext
# from jose import jwt, JWTError
# from fastapi.security import OAuth2PasswordBearer
# from fastapi import HTTPException, Depends
# import os
# from datetime import datetime, timedelta
# from dotenv import load_dotenv

# load_dotenv()


# # Password Hashing Setup
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# # JWT Settings
# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60


# # OAuth2 Setup
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# # Password Functions
# def hash_password(password: str):
#     return pwd_context.hash(password[:72])


# def verify_password(plain_password: str, hashed_password: str):
#     return pwd_context.verify(plain_password[:72], hashed_password)



# # Token Functions
# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def decode_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         return None



# # Get Current User
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     payload = decode_token(token)
#     if payload is None:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")
#     return payload




from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends
from datetime import datetime, timedelta
from dotenv import load_dotenv
from bson import ObjectId
import os

from database import users_collection

load_dotenv()

# ---------------- PASSWORD HASHING ---------------- #

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    # bcrypt limitation workaround
    return pwd_context.hash(password[:72])


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password[:72], hashed_password)


# ---------------- JWT SETTINGS ---------------- #

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ---------------- OAUTH2 SETUP ---------------- #

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")


# ---------------- TOKEN FUNCTIONS ---------------- #

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def decode_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except JWTError:
        return None


# ---------------- CURRENT USER ---------------- #

def get_current_user(token: str = Depends(oauth2_scheme)):

    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token payload"
        )

    try:

        user = users_collection.find_one({
            "_id": ObjectId(user_id)
        })

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid user id"
        )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user