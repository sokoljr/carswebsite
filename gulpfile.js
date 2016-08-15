var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    minify = require('gulp-cssmin'),
    less = require('gulp-less'),
    sourcemap = require('gulp-sourcemaps');

gulp.task('uglify', function() {
    return gulp.src('js/src/*.js')
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('js/prod'))
            .pipe(notify('Minify js is completed'));
});

gulp.task('minify', function() {
        return gulp.src('less/main.less')
            //Нужно для получения sourcemaps
            //.pipe(sourcemap.init())
            .pipe(less())
            //Нужно для получения sourcemaps
            //.pipe(sourcemap.write())
            .pipe(concat('style.min.css'))
            .pipe(minify())
            .pipe(gulp.dest('css/prod'))
            .pipe(notify('Minify css is completed'));
});

gulp.task('watch', function() {
    gulp.watch('js/src/*.js', ['uglify']);
    gulp.watch('less/*.less', ['minify']);
});