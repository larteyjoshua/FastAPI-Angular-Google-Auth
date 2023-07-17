from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.student_controller import student_router

app = FastAPI(title='FastAPI-Angular-Google-Auth')

origins = ["http://localhost:4200", "http://127.0.0.1:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello, World!"}


app.include_router(student_router)
