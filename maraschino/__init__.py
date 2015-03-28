from flask import Flask, render_template
app = Flask(__name__)

from tools import load_blueprints
from settings import SETTINGS
import currently_playing

MODULES = load_blueprints(app, 'modules')

CONFIG = {
    'columns': [
        ['RecentEpisodes'],
        ['RecentMovies'],
    ],
    'serverUrl': '%s://%s:%s/' % (SETTINGS['protocol'], SETTINGS['server'], SETTINGS['port'])
}


@app.route('/')
def index():
    return render_template('index.html',
                           modules = MODULES,
                           config = CONFIG)


if __name__ == "__main__":
    app.run()
