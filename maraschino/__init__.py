from flask import Flask, render_template
app = Flask(__name__)

from helpers import load_blueprints
from settings import SETTINGS

load_blueprints(app, 'modules')
PLUGINS = load_blueprints(app, 'plugins')

CONFIG = {
    'columns': [
        [],
        [],
        ['RecentEpisodes'],
    ],
    'num_columns': 3,
}

@app.route('/')
def index():
    return render_template('index.html',
                           plugins = PLUGINS,
                           config = CONFIG)

if __name__ == "__main__":
    app.run()
