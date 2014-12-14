from flask import Blueprint

module = Blueprint('recent', __name__,
                   static_folder='static/c',
                   static_url_path='/static/modules/recent')

@module.route('/recent')
def recent():
    return "This is a test."
