import sys, os
from helpers import rundir, load_blueprints

sys.path.append(os.path.join(rundir(), 'lib'))

from tinydb import TinyDB, where
from flask import Flask, render_template
app = Flask(__name__)

load_blueprints(app, 'modules')
plugins = load_blueprints(app, 'plugins')
print plugins

settings = {
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
                           plugins = plugins,
                           settings = settings)

if __name__ == "__main__":
    app.run()
