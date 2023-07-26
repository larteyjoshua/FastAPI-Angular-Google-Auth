from typing import List
from pydantic import BaseModel


class Student(BaseModel):
    name: str
    class_: str
    age: int
    favorite_food: str
    favorite_color: str


class StudentList(BaseModel):
    results: List[Student]
    totalRecords: int


class Credentials(BaseModel):
    token: str
    clientId: str = None


class User(BaseModel):
    name: str
    email: str


class Secret(BaseModel):
    clientId: str
    androidClientId: str
    iosClientId: str
