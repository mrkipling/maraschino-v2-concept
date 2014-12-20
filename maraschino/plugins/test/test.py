import json
from flask import Blueprint

module = Blueprint('test', __name__,
                   static_folder='static/c',
                   static_url_path='/static')

@module.route('/')
def test():
    return "This is a test plugin."
