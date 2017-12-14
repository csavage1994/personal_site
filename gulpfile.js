var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
 
gulp.task('sass', function(){
  return gulp.src('./public/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('compress', function() {
  return gulp.src(['./public/third_party/detectMobile.js', './public/index.js'])
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('assets', function() {
  return gulp.src(['./public/*.png', './public/index.html', './public/favicon.ico'])
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function() {
  gulp.watch('./styles.scss', ['sass'])
})

gulp.task('default', ['sass', 'compress', 'assets'])

