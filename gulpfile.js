var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    react = require('gulp-react'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var paths = {
    styles: {
        lib: [],
        site: ['./assets/less/site/reset.less',
               './assets/less/site/base.less',
               './maraschino/modules/*/static/less/**']
    },
    scripts: {
        site: './assets/js/site/base.jsx'
    },
    images: ['./assets/images/**']
};





/*--- styles ---*/

gulp.task('styles:lib', function() {
    return gulp.src(paths.styles.lib)
        .pipe(less())
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('styles:site', function() {
    return gulp.src(paths.styles.site)
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./static/css'));
});





/*--- scripts ---*/

gulp.task('scripts:site', function() {
    var browserified = transform(function(filename) {
        return browserify({
            entries: filename,
            extensions: ['.jsx'],
            debug: true
        }).bundle();
    });

    return gulp.src(paths.scripts.site)
        .pipe(browserified)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(rename('site.js'))
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
    gulp.watch('./assets/less/lib/*', ['styles:lib']);
    gulp.watch('./assets/less/site/*', ['styles:site']);
    gulp.watch('./assets/js/site/*', ['scripts:site']);
    gulp.watch('./assets/images/*', ['default']);
});





/*--- default task ---*/

gulp.task('default', ['clean'], function() {
    gulp.start('styles:lib',
               'styles:site',
               'scripts:site',
               'images');
});
