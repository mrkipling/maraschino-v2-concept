import json
from flask import Blueprint

module = Blueprint('recent', __name__,
                   static_folder='static/c',
                   static_url_path='/static')

@module.route('/episodes/')
def recent():
    episodes = {
        "episodes": [{
            "name": "Test"
        }]
    }

    return json.dumps(episodes)
