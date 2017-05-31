'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

module.exports = function (options) {

    gulp.task('watch', function () {

        gulp.watch(['assets/scss/*', 'assets/scss/**/*'], ['styles']);

        gulp.watch(['_dest/assets/**/*.css'],
            function () {
                gulp.src('_dest/assets/**/*.css')
                .pipe(browserSync.reload({ stream: true }));
            });
    });
};
        