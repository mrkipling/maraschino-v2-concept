var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var paths = {
    styles: {
        lib: ['./assets/css/lib/base.css',
              './assets/css/lib/skeleton.css'],
        site: ['./assets/css/site/site.less']
    },
    scripts: {
        lib: ['./assets/js/lib/jquery.js',
              './assets/js/lib/bootstrap.js'],
        modernizr: ['./assets/js/lib/modernizr.js'],
        site: ['./assets/js/site/*']
    },
    images: ['./assets/images/*']
};





/*--- styles ---*/

gulp.task('styles_lib', function() {
    return gulp.src(paths.styles.lib)
        .pipe(less())
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('styles_site', function() {
    return gulp.src(paths.styles.site)
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest('./static/css'));
});





/*--- scripts ---*/

gulp.task('scripts_lib', function() {
    return gulp.src(paths.scripts.lib)
        .pipe(concat('lib.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('scripts_modernizr', function() {
    return gulp.src(paths.scripts.modernizr)
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('scripts_site', function() {
    return gulp.src(paths.scripts.site)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('site.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});





/*--- images ---*/

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./static/images'));
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

var watching = false;

gulp.task('watch', function () {
    watching = true;
    gulp.watch('./assets/css/lib/*', ['styles_lib']);
    gulp.watch('./assets/css/site/*', ['styles_site']);
    gulp.watch('./assets/js/lib/*', ['scripts_lib']);
    gulp.watch('./assets/js/site/*', ['scripts_site']);
    gulp.watch('./assets/images/*', ['default']);
});





/*--- default task ---*/

gulp.task('default', ['clean'], function() {
    gulp.start('styles_lib',
               'styles_site',
               'scripts_lib',
               'scripts_modernizr',
               'scripts_site',
               'images');
});
