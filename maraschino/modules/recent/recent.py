from flask import Blueprint

module = Blueprint('recent', __name__)

@module.route('/recent')
def recent():
    return "This is a test."
