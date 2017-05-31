'use strict';

var gulp = require('gulp'),
    es = require('event-stream'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    angularFilesort = require('gulp-angular-filesort'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

module.exports = function (options) {

    gulp.task('build', ['styles']);

    gulp.task('styles', function () {
        compileSass();
    });

    function compileSass() {
        gulp.src('assets/scss/main.scss')
            .pipe(sass().on('error', function(err) { console.log('ERR: ' + err); }))
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest('assets/css'));

        gulp.src('assets/scss/home.scss')
            .pipe(sass().on('error', function (err) { console.log('ERR: ' + err); }))
            .pipe(concat('home.css'))
            .pipe(cssmin())
            .pipe(gulp.dest('assets/css'));
    }
};

