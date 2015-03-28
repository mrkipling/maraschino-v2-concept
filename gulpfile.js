var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    buffer = require('gulp-buffer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    es6ify = require('es6ify'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    watchify = require('watchify');

var paths = {
    styles: {
        lib: [],
        app: ['./assets/less/app/reset.less',
              './assets/less/app/vars/colors.less',
              './assets/less/app/base.less',
              './assets/less/app/components/**/*.less',
              './assets/less/app/modules/**/*.less']
    },
    scripts: {
        app: './assets/js/app/App.jsx'
    },
    images: ['./assets/images/**']
};





/*--- styles ---*/

gulp.task('styles:lib', function() {
    return gulp.src(paths.styles.lib)
        .pipe(less())
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./static/css'))
        .pipe(gulpif(watching, livereload()));
});

gulp.task('styles:app', function() {
    return gulp.src(paths.styles.app)
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./static/css'))
        .pipe(gulpif(watching, livereload()));
});





/*--- scripts ---*/

var watching = false;

gulp.task('scripts:app', function() {
    browserified();
});

gulp.task('scripts:app:watch', function() {
    watching = true;
    browserified();
});

// Browserify app scripts

function browserified() {
    var b = browserify({
        cache: {},
        debug: true,
        extensions: ['.jsx'],
        fullPaths: true,
        packageCache: {}
    });

    if (watching) {
        // if watch is enabled, wrap this bundle inside watchify
        b = watchify(b);
        b.on('update', function(){
            bundle(b);
        });
    }

    b.add(paths.scripts.app)
        .transform(reactify)
        .transform(es6ify.configure(/.jsx/));

    bundle(b);
}

// Browserify bundle and other plugins

function bundle(b) {
    b.bundle()
        .on('error', handleError)
        .pipe(source('app.js'))
        .pipe(buffer())
        //.pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/js'))
        .pipe(gulpif(watching, livereload()));
}





/*--- images ---*/

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./static/images'))
        .pipe(gulpif(watching, livereload()));
});





/*--- clean ---*/

gulp.task('clean', function() {
    return gulp.src(['./static/css', './static/js'], {read: false})
        .pipe(rimraf());
});





/*--- handle errors gracefully ---*/

function handleError(err) {
    console.log(err.toString());
    if (watching) {
        this.emit('end');
    } else {
        process.exit(1);
    }
}





/*--- watch ---*/

gulp.task('watch', ['scripts:app:watch'], function() {
    watching = true;
    gulp.watch('./assets/less/lib/**', ['styles:lib']);
    gulp.watch('./assets/less/app/**', ['styles:app']);
    gulp.watch('./assets/images/**', ['default']);

    // start live reload server
    livereload.listen(35729);
});





/*--- default task ---*/

gulp.task('default', ['clean'], function() {
    gulp.start('styles:lib',
               'styles:app',
               'scripts:app',
               'images');
});
