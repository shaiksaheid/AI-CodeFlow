from fastapi import APIRouter, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests

from app.database.db import SessionLocal
from app.database.models import User

from app.services.jwt_service import (
    create_access_token
)

router = APIRouter(
    prefix="/google",
    tags=["Google Auth"]
)

GOOGLE_CLIENT_ID = "154310094299-08iks56oljv0idep4dbgla9btb7g6hlv.apps.googleusercontent.com"


@router.post("/login")
def google_login(payload: dict):

    token = payload.get("token")

    try:

        user_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = user_info["email"]
        username = user_info["name"]

        db = SessionLocal()

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not user:

            user = User(
                username=username,
                email=email,
                password_hash="GOOGLE_LOGIN"
            )

            db.add(user)
            db.commit()
            db.refresh(user)

        jwt_token = create_access_token({
            "user_id": user.id,
            "email": user.email
        })

        return {
            "access_token": jwt_token,
            "user": {
                "id": user.id,
                "name": user.username,
                "email": user.email
            }
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token"
        )