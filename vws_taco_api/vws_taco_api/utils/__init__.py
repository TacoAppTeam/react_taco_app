import hug
import jwt

secret_key = 'tacotacotacotac0'


def token_verify(token):
    try:
        return jwt.decode(token, secret_key, algorithms='HS256')
    except jwt.DecodeError:
        return False


auth_hug = hug.http(requires=hug.authentication.token(token_verify))
