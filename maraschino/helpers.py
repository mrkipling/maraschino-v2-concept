import sys, os

def check_frozen():
    # All of the modules are built-in to the interpreter, e.g., by py2exe
    return hasattr(sys, 'frozen')

def rundir():
    encoding = sys.getfilesystemencoding()
    if check_frozen():
        return os.path.dirname(unicode(sys.executable, encoding))
    return os.path.dirname(unicode(__file__, encoding))
