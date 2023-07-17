from fastapi import HTTPException
from loguru import logger


def error_exception(status, details) -> HTTPException:
    credentials_exception = HTTPException(
        status_code=status, detail=details, headers={
            "WWW-Authenticate": "Bearer"}
    )
    logger.info(f'status: {status}: {details}')
    return credentials_exception
