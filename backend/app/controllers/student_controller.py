from typing import List
from loguru import logger
from app.models.schemas import Credentials, User, StudentList
from app.security.token_volidations import validate_token, verify_token, get_refreshed_token
from fastapi import APIRouter, Depends, Request
from app.services.students import generate_student_list


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


@student_router.post("/refresh_token")
def refresh_token(id_token: str):
    access_token = get_refreshed_token(id_token)
    return {"access_token": access_token}
