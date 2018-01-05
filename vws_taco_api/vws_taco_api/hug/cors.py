def cors_support(response, *args, **kwargs):
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
