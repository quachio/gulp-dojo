/******************************************************************************
 * Required
 *****************************************************************************/
const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoClose = require('browser-sync-close-hook');

/******************************************************************************
 * browserSync Task
 *****************************************************************************/
gulp.task('browser-sync', function() {
    browserSync.use({
      plugin() {},
      hooks: {
        'client:js': autoClose,
      },
    });
    browserSync({
        server: {
            baseDir: "./app/",
        },
        browser: ["google chrome", "safari"],
    });
});

/******************************************************************************
 * HTML Task
 *****************************************************************************/

gulp.task('html', function() {
    gulp.src('app/**/*.html')
        .pipe(reload({
            stream: true
        }));
});


/******************************************************************************
 * CSS Task
 *****************************************************************************/

gulp.task('css', function() {
    gulp.src('app/css/**/*.css')
        .pipe(reload({
            stream: true
        }));

});

/******************************************************************************
 * Script Task
 *****************************************************************************/

gulp.task('scripts', function() {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(reload({
            stream: true
        }));
});


/******************************************************************************
 * Watch Tasks
 *****************************************************************************/

gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/css/**/*.css', ['css']);
    gulp.watch('app/js/**/*.js', ['scripts']);
});

/******************************************************************************
 * Default Task
 *****************************************************************************/

gulp.task('default', ['html', 'css', 'scripts', 'browser-sync', 'watch']);
