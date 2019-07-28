const gulp = require('gulp');
const sass = require('gulp-sass');
// const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp
    .src('src/styles/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp
    .src('src/html/**/*.html')
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task('config-files', function() {
  return gulp
    .src(['./_config.yml', './CNAME'])
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task(
  'serve',
  gulp.series('sass', function() {
    browserSync.init({
      open: false,
      server: './build',
    });

    gulp.watch('src/styles/**/*.scss', gulp.series('sass'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
    // gulp.watch('./build/*.html').on('change', browserSync.reload);
  }),
);

gulp.task('default', gulp.series('config-files', 'sass', 'html', 'serve'));
