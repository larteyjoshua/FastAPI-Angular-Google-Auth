from google.oauth2 import id_token, credentials
from google.auth.transport import requests
from fastapi import Request, status
from app.utils.exceptions import error_exception
from loguru import logger
from app.models.schemas import Credentials
from app.utils.config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET


async def validate_token(request: Request) -> None:
    try:
        if "Authorization" in request.headers:
            token_type, token = request.headers["Authorization"].split(" ")

            if token_type == "Google-Bearer":
                verify = id_token.verify_oauth2_token(
                    id_token=token, request=requests.Request())
                logger.info(verify)
                return verify
        else:
            raise error_exception(
                status=status.HTTP_401_UNAUTHORIZED, details="Unauthorized access- No Token Header"
            )

    except Exception as e:
        logger.info(e)
        raise error_exception(
            status=status.HTTP_401_UNAUTHORIZED, details="Unauthorized access"
        )


def verify_token(credential: Credentials) -> None:

    try:
        verify_user = id_token.verify_oauth2_token(
            credential.token, requests.Request(), GOOGLE_CLIENT_ID)
        logger.info(verify_user)

        userName: str = verify_user['name']
        UserEmail: str = verify_user['email']

        response_data = {
            'name': userName,
            'email': UserEmail
        }
        return response_data
    except Exception as e:
        logger.info(str(e))
        raise error_exception(
            status=status.HTTP_401_UNAUTHORIZED, details="Unauthorized access")
