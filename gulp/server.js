'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var middleware = require('./proxy');

module.exports = function (options) {

    gulp.task('connect', ['build', 'watch'], function () {
        browserSyncInit();
    });

    function browserSyncInit(baseDir, browser) {

        browser = browser === undefined ? 'default' : browser;

        var server = {
            baseDir: ['_dest']
        };

        if (middleware.length > 0) {
            server.middleware = middleware;
        }

        browserSync.instance = browserSync.init({
            startPath: '/',
            server: server,
            browser: browser,
            port: 3004,
            ui: {
                port: 3005
            }
        });
    };

};