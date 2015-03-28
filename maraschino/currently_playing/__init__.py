from flask import Flask, render_template
from maraschino import app
from maraschino.tools import xbmc_api
from maraschino.settings import SETTINGS
import json


@app.route('/currently-playing/')
def currently_playing():
    try:
        xbmc = xbmc_api()
        active_player = xbmc.Player.GetActivePlayers()['result']
        playerid = active_player[0]['playerid']

        player_info = xbmc.Player.GetProperties(playerid=playerid, properties=['time', 'totaltime', 'position', 'percentage', 'repeat', 'shuffled'])['result']
        volume = xbmc.Application.GetProperties(properties=['volume'])['result']['volume']

        currently_playing = {}

        if active_player[0]['type'] == 'video':
            currently_playing = xbmc.Player.GetItem(playerid = 1, properties = ['title', 'season', 'episode', 'duration', 'showtitle', 'fanart', 'tvshowid', 'plot', 'thumbnail', 'year'])['result']['item']

        player_info['media'] = currently_playing
        player_info['volume'] = volume

    except:
        return json.dumps({})

    return json.dumps(player_info)
