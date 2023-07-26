import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
GOOGLE_AUTH_URL = os.environ.get("GOOGLE_AUTH_URL")
GOOGLE_TOKEN_URL = os.environ.get("GOOGLE_TOKEN_URL")

CLIENT_ID = os.environ.get("CLIENT_ID")
ANDROID_CLIENT_ID = os.environ.get("ANDROID_CLIENT_ID")
IOS_CLIENT_ID = os.environ.get("IOS_CLIENT_ID")
