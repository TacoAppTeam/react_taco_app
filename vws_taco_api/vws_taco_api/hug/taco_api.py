import hug
import scripted_endpoints

from vws_taco_api.vws_taco_api.models import *

"""Taco API Module."""
"""To run, execute `hug -f taco_api.py`"""


@hug.extend_api()
def with_other_apis():
    return [scripted_endpoints]


# TODO Add more endpoints, with business logic.
# These can reuse the existing base api, and/or use the models