from maraschino.tools import xbmc_api
from flask import Blueprint
import json

module = Blueprint('recent', __name__)


@module.route('/episodes/')
def recent():
    xbmc = xbmc_api()
    episodes = xbmc.VideoLibrary.GetRecentlyAddedEpisodes(properties = ['title', 'season', 'episode', 'showtitle', 'playcount', 'tvshowid'])['result']['episodes']
    return json.dumps(episodes)


@module.route('/movies/')
def recent_movies():
    xbmc = xbmc_api()
    movies = xbmc.VideoLibrary.GetRecentlyAddedMovies(properties = ['title', 'year', 'tagline', 'playcount'])['result']['movies']
    return json.dumps(movies)
