from typing import List
from loguru import logger
from app.models.schemas import Credentials, User, StudentList, Secret
from app.security.token_volidations import validate_token, verify_token
from fastapi import APIRouter, Depends
from app.services.students import generate_student_list
from app.services.secrets import get_secrets


student_router = APIRouter(prefix='/api')
students = generate_student_list(5000)


@student_router.get("/students", response_model=StudentList)
async def get_students(page: int = 1, size: int = 10, google_auth: None = Depends(validate_token)) -> StudentList:
    totalRecord = len(students)
    start = (page - 1) * size
    end = start + size
    data = {'totalRecords': totalRecord, 'results': students[start:end]}
    return data


@student_router.post("/verify-google-auth",  response_model=User)
async def verify_token_fn(data: Credentials) -> User:
    details = verify_token(data)
    logger.info(details)
    return details


@student_router.get("/secrets", response_model=Secret)
async def get_secrets_data() -> Secret:
    secret_data = await get_secrets()
    logger.info(secret_data)
    return secret_data
