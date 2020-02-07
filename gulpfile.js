'use strict';

const gulp = require('gulp'), 
    sass = require('gulp-sass'), 
    pug = require('gulp-pug'), 
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

sass.compiler = require('node-sass');

const browserSync = require('browser-sync').create();

const pathBuild = './public/';
const pathSrc = './src/';

gulp.task('sass', function () {
    return gulp.src(pathSrc + 'scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 2 versions', '> 0.7%']))
        .pipe(gulp.dest('public/css'))
});

gulp.task('pug', () => {
    return gulp.src(pathSrc + 'pug/pages/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public'))
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'public'
    }});
});

gulp.task('img', () => {
    return gulp.src(pathSrc + 'img/**/*.+(png|jpg)')
        .pipe(gulp.dest(pathBuild + 'img'))
});

gulp.task('clean', function() {
    return del(['public/**', '!public']);
  });

  function reload (done) {
    browserSync.reload();
    done();
  }
  

gulp.task('watch', () => {
    gulp.watch(pathSrc + 'scss/*.scss', gulp.series('sass', reload));
    gulp.watch(pathSrc + 'pug/**/*.pug', gulp.series('pug', reload));
    gulp.watch(pathSrc + 'img/**/*.+(png|jpg)', gulp.series('img', reload));
});

gulp.task('default', gulp.series('clean', 'sass', 'pug', 'img', gulp.parallel('watch', 'browserSync')));