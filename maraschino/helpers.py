import os, sys, imp
from lib.xbmcjson import XBMC, PLAYER_VIDEO
from settings import SETTINGS

def check_frozen():
    # All of the modules are built-in to the interpreter, e.g., by py2exe
    return hasattr(sys, 'frozen')

def rundir():
    encoding = sys.getfilesystemencoding()
    if check_frozen():
        return os.path.dirname(unicode(sys.executable, encoding))
    return os.path.dirname(unicode(__file__, encoding))

def load_blueprints(app, path):
    """
        Look for for any modules or packages in the given directory, load them
        and register a blueprint. Blueprints must be created with the name
        'module'.
        https://github.com/MalphasWats/flask-blueprint-loader/
    """

    path = os.path.join(rundir(), path)
    dir_list = os.listdir(path)
    mods = {}
    plugins = []

    for fname in dir_list:
        if os.path.isdir(os.path.join(path, fname)) and os.path.exists(os.path.join(path, fname, '__init__.py')):
            f, filename, descr = imp.find_module(fname, [path])
            mods[fname] = imp.load_module(fname, f, filename, descr)
            app.register_blueprint(getattr(mods[fname], 'module'),
                                   url_prefix='/module/' + getattr(mods[fname], 'module').name)
            plugins.append(getattr(mods[fname], 'module').name)

        elif os.path.isfile(os.path.join(path, fname)):
            name, ext = os.path.splitext(fname)
            if ext == '.py' and not name == '__init__':
                f, filename, descr = imp.find_module(name, [path])
                mods[fname] = imp.load_module(name, f, filename, descr)
                app.register_blueprint(getattr(mods[fname], 'module'),
                                       url_prefix='/module/' + getattr(mods[fname], 'module').name)
                plugins.append(getattr(mods[fname], 'module').name)

    return plugins

def xbmc_api():
    api_url = '%s://%s:%s/jsonrpc' % (SETTINGS['protocol'], SETTINGS['server'], SETTINGS['port'])
    return XBMC(api_url, SETTINGS['username'], SETTINGS['password'])
