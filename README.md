# Site template

A simple template for a frontend build with some sensible defaults:

* package.json for npm
* bower.json for Bower, pre-configured with:
    * jQuery 1.x latest
    * Bootstrap
    * Modernizr
* gulpfile.js, pre-configured to:
    * Concatenate, autoprefix, and minify a lib.css and site.css
    * Concatenate and minify a lib.js; the same for site.js but also jshinted
    * optimise images without a loss in quality
    * watch files for changes
* simple index.html file
* site.py for a Flask project
