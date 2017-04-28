import hug

@hug.get()
def taco():
    '''
    Taco api service

    Here are tacos
    '''

    return { "tacos": "are gooood" }
