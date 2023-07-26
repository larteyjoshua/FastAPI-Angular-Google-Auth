from app.utils.config import CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID


async def get_secrets():
    client_ids = {
        'clientId': CLIENT_ID,
        'androidClientId': ANDROID_CLIENT_ID,
        'iosClientId': IOS_CLIENT_ID
    }
    return client_ids
