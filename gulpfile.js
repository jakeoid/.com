'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'pug', 'pug-projects'], function() {

    browserSync.init({
        server: "./",
        serveStaticOptions: {
            extensions: ['html']
        }
    });


    gulp.watch("./src/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/views/*.pug", ['pug']).on('change', browserSync.reload);
    gulp.watch("./src/views/projects/*.pug", ['pug-projects']).on('change', browserSync.reload);
});

gulp.task('pug', function() {
    return gulp.src("./src/views/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task('pug-projects', function() {
    return gulp.src("./src/views/projects/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./projects"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);