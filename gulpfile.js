const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

//Compile Scss & Inject Into Browser

// Compile sass into CSS & auto-inject into browsers & minifiy css
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'assets/scss/main.scss'])
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest("assets/css"))
      .pipe(browserSync.stream());
});

// Gulp task to minify JavaScript files
gulp.task('script', function() {
  return gulp.src('assets/ujs/*.js')
  //Minify the file
  .pipe(uglify())
  //Output
  .pipe(gulp.dest('assets/js/'));
});


//Watch Sass $ serve
gulp.task('serve', ['sass','script'], function(){
  browserSync.init({
    server: "./"
  });

  //gulp.watch(['assets/scss/*.scss'], ['sass']);
  gulp.watch(['assets/scss/main.scss'], ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
