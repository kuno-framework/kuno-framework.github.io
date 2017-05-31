/// <binding Clean='clean' />

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {};

gulp.task('default', ['connect']);

wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file)(options);
});