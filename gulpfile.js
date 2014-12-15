var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    react = require('gulp-react'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var paths = {
    styles: {
        lib: [],
        site: ['./assets/css/site/reset.less',
               './assets/css/site/base.less']
    },
    scripts: {
        lib: ['./assets/js/lib/jquery.js',
              './assets/js/lib/react-with-addons.js'],
        site: ['./assets/js/site/base.js',
               './assets/js/site/tools.js',
               './assets/js/site/container.js',
               './assets/js/site/render.js']
    },
    images: ['./assets/images/**']
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
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('styles_modules', function() {
    return gulp.src('./maraschino/modules/*/static/less/*.less', { base: './' })
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.slice(0, path.dirname.length - 4) + 'c';
        }))
        .pipe(gulp.dest('./'));
});





/*--- scripts ---*/

gulp.task('scripts_lib', function() {
    return gulp.src(paths.scripts.lib)
        .pipe(concat('lib.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('scripts_site', function() {
    return gulp.src(paths.scripts.site)
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('site.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('scripts_modules', function() {
    return gulp.src('./maraschino/modules/*/static/js/*.js', { base: './' })
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(uglify())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.slice(0, path.dirname.length - 2) + 'c';
        }))
        .pipe(gulp.dest('./'));
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
               'styles_modules',
               'scripts_lib',
               'scripts_site',
               'scripts_modules',
               'images');
});
