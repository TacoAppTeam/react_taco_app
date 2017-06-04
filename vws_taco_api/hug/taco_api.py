"""Taco API Module."""
import hug


@hug.get(versions=2, examples="style=fish")
def taco(style: hug.types.text):
    """
    Show the tacos endpoint.

    Here are the tacos.
    """
    return {"tacos": "are %s" % style}


@hug.get(versions=1, examples="style=1")
def taco(style: int):
    """
    Show the tacos endpoint.

    Here are the tacos.
    """
    # TODO
    return {"tacos": "are gooood"}

# TODO Add
