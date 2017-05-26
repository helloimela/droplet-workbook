// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var mainBowerFiles = require('gulp-main-bower-files');
var bower = require('gulp-bower');
var bowerSrc = require('gulp-bower-src');
var gulpFilter = require('gulp-filter');
var del = require('del');
var image = require('gulp-image'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')();

var config = {
     bowerDir: 'dev/js/vendor' 
}

var bowerFiles = {
    jquery:'dev/js/vendor/jquery/dist/jquery.min.js',
    fullpage:'dev/js/vendor/fullpage.js/dist/jquery.fullpage.js'
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean:vendorjs',function(){
    return del([
        'dist/js/vendor'
        ]);
});

gulp.task('clean:images',function(){
    return del([
        'dist/img/'
        ]);
});

gulp.task('clean:js',function(){
    return del([
        'dist/js/main/**/*.js'
        ]);
});


// Compile Our Sass
gulp.task('compass', function() {
  gulp.src('dev/sass/**/*.scss')
    .pipe(compass({
      css: 'dev/css',
      sass: 'dev/sass'
    }))
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// HTML task
gulp.task('html', function(){
    gulp.src('dev/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Image task
gulp.task('image', function () {
  gulp.src('dev/img/**/*')
    .pipe(image({
        mozjpeg: false,
        zopflipng: false
    }))
    .pipe(gulp.dest('dist/img/'))
    .pipe(browserSync.stream());
});

// Build Vendor JS
gulp.task('bower', function() {
    return gulp.src([bowerFiles.fullpage])
        .pipe(concat('vendor.js'))
        // .pipe(uglify({
        //     mangle:false
        // }))
        .pipe(gulp.dest('dist/js/vendor'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('dev/js/main/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('dev/js/main/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/main/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify({
            mangle:false
        }))
        .pipe(gulp.dest('dist/js/main/'));
});

gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

// Watch Files For Changes

gulp.task('serve', ['clean:vendorjs','bower','clean:images','clean:js','html','compass', 'image','lint', 'scripts','js-watch'], function() {

    browserSync.init({
        server: './dist'
    });

    gulp.watch(['bower.json','.bowerrc'],['clean:vendorjs','bower']);
    gulp.watch('dev/js/main/**/*.js', ['clean:js','lint', 'scripts','js-watch']);
    gulp.watch('dev/img/**/*', ['clean:images', 'image']);
    gulp.watch('dev/**/*.html', ['html']);
    gulp.watch('dev/sass/**/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['html', 'image', 'lint', 'compass', 'bower', 'scripts', 'serve']);