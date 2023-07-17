import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
GOOGLE_AUTH_URL = os.environ.get("GOOGLE_AUTH_URL")
GOOGLE_TOKEN_URL = os.environ.get("GOOGLE_TOKEN_URL")

JWT_PUBLIC_KEY = os.environ.get("JWT_PUBLIC_KEY")
JWT_PRIVATE_KEY = os.environ.get("JWT_PRIVATE_KEY")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM")
