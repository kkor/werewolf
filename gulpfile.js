// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('browserify-client', [], function() {
  return gulp.src('src/client/js/app.jsx')
    .pipe(browserify({
      insertGlobals: true,
      "transform": [
        "reactify",
        "envify"
      ]
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('js-watch', function() {
  gulp.watch(['src/client/js/**/*.js', 'src/client/js/**/*.jsx'], ['browserify-client']);
});

gulp.task('less-watch', function() {
  gulp.watch(['src/client/styles/**/*.less'], ['styles']);
});

gulp.task('styles', function() {
  return gulp.src('src/client/styles/app.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/css'));
});

// gulp.task('minify', ['styles'], function() {
//   return gulp.src('build/app.css')
//     .pipe(minifyCSS())
//     .pipe(rename('app.min.css'))
//     .pipe(gulp.dest('public/stylesheets'));
// });

// gulp.task('uglify', ['browserify-client'], function() {
//   return gulp.src('build/bundle.js')
//     .pipe(uglify())
//     .pipe(rename('bundle.min.js'))
//     .pipe(gulp.dest('public'));
// });

gulp.task('build', ['browserify-client', 'styles']);
gulp.task('watch', ['js-watch', 'less-watch']);

gulp.task('default', ['build', 'watch']);
