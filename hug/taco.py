"""Taco API Module."""
import hug


@hug.get()
def taco():
    """
    Show the tacos endpoint.
    
    Here are the tacos.
    """
    return { "tacos": "are gooood" }
