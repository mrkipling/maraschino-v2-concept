from flask import Flask, render_template
app = Flask(__name__)

from helpers import load_blueprints
from settings import SETTINGS

MODULES = load_blueprints(app, 'modules')

CONFIG = {
    'columns': [
        ['RecentEpisodes'],
        [],
    ],
}

@app.route('/')
def index():
    return render_template('index.html',
                           modules = MODULES,
                           config = CONFIG)

if __name__ == "__main__":
    app.run()
