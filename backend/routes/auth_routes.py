# from fastapi import APIRouter, HTTPException, Depends
# from fastapi.security import OAuth2PasswordRequestForm
# from bson import ObjectId

# from database import users_collection
# from auth import (
#     hash_password,
#     verify_password,
#     create_access_token,
#     verify_google_token
# )

# router = APIRouter()


# # ---------------- REGISTER ---------------- #

# @router.post("/register")
# def register(data: dict):

#     username = data.get("username")
#     email = data.get("email")
#     password = data.get("password")

#     if not username or not email or not password:
#         raise HTTPException(status_code=400, detail="Missing fields")

#     existing_user = users_collection.find_one({"email": email})

#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = hash_password(password)

#     user = {
#         "username": username,
#         "email": email,
#         "password": hashed_password
#     }

#     result = users_collection.insert_one(user)

#     access_token = create_access_token(
#         {"user_id": str(result.inserted_id)}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }


# # ---------------- LOGIN ---------------- #

# @router.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):

#     user = users_collection.find_one({"email": form_data.username})

#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     if not verify_password(form_data.password, user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     access_token = create_access_token(
#         {"user_id": str(user["_id"])}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }


# # ---------------- GOOGLE LOGIN ---------------- #

# @router.post("/google-login")
# def google_login(data: dict):

#     token = data.get("token")

#     # DEBUG PRINT (important)
#     print("GOOGLE TOKEN RECEIVED:", token)

#     if not token:
#         raise HTTPException(status_code=400, detail="Google token missing")

#     google_user = verify_google_token(token)

#     email = google_user["email"]
#     name = google_user.get("name", "Google User")

#     user = users_collection.find_one({"email": email})

#     if not user:

#         new_user = {
#             "username": name,
#             "email": email,
#             "password": None
#         }

#         result = users_collection.insert_one(new_user)

#         user_id = str(result.inserted_id)

#     else:

#         user_id = str(user["_id"])

#     access_token = create_access_token(
#         {"user_id": user_id}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }


from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from database import users_collection
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_google_token
)

router = APIRouter()

# ---------------- REGISTER ---------------- #

@router.post("/register")
def register(data: dict):

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        raise HTTPException(status_code=400, detail="Missing fields")

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(password)

    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    result = users_collection.insert_one(user)

    access_token = create_access_token(
        {"user_id": str(result.inserted_id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    user = users_collection.find_one({"email": form_data.username})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        {"user_id": str(user["_id"])}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------- GOOGLE LOGIN ---------------- #

@router.post("/google-login")
def google_login(data: dict):

    token = data.get("credential")

    print("GOOGLE TOKEN RECEIVED:", token)

    if not token:
        raise HTTPException(status_code=400, detail="Google token missing")

    google_user = verify_google_token(token)

    email = google_user["email"]
    name = google_user.get("name", "Google User")

    user = users_collection.find_one({"email": email})

    if not user:

        new_user = {
            "username": name,
            "email": email,
            "password": None
        }

        result = users_collection.insert_one(new_user)
        user_id = str(result.inserted_id)

    else:
        user_id = str(user["_id"])

    access_token = create_access_token(
        {"user_id": user_id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }