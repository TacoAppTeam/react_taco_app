def cors_support(response, *args, **kwargs):
    response.set_header('Access-Control-Allow-Origin', '*')
