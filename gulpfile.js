"use strict";
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jasmine = require("gulp-jasmine");
var exit = require('gulp-exit');
var less = require('gulp-less-sourcemap');
var path = require('path');


// coverage task
gulp.task('coverage', function (cb) {
    gulp.src(['./app/**/*.js'])
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire())
        .on('finish', cb);
});

// test with coverage
gulp.task('test-with-coverage', ['coverage'], function () {
    gulp.src(['./tests/**/*-spec.js'])
        .pipe(jasmine({
            verbose: true,
            timeout: 5000,
            includeStackTrace: true
        }))
        .pipe(istanbul.writeReports({
            reporters: [ 'json', 'clover', 'html' ]
        }))
        .pipe(exit());
});

// test task
gulp.task('test', function () {
    gulp.src(['./tests/**/*-spec.js'])
        .pipe(jasmine({
            verbose: true,
            timeout: 5000,
            includeStackTrace: true
        }))
        .pipe(exit());
});

// copy less files for source maps
gulp.task('copy-less', function () {
    gulp.src('./less/**/*.less')
        .pipe(gulp.dest('./storage/assets/css'));
});

// compile less files dev env
gulp.task('less-dev', ['copy-less'], function () {
    gulp.src('./less/main.less')
        .pipe(less({
            generateSourceMap: true, // default true,
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./storage/assets/css'));
});

// compile less files production env
gulp.task('less-watch', function () {
    gulp.watch('./less/**/*.less', ['less-dev']);
});

// compile less files production env
gulp.task('less-prod', function () {
    gulp.src('./less/main.less')
        .pipe(less({
            generateSourceMap: false, // default true,
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./storage/assets/css'));
});

