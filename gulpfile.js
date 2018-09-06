const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

//Compile Scss & Inject Into Browser

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'assets/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("assets/css"))
      .pipe(browserSync.stream());
});

// gulp.task('sass', function(){
//   return gulp.src(['assets/scss/*.scss'])
//     .pipe(sass())
//       .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//       }))
//       .pipe(gulp.dest("assets/css"))
//       .pipe(browserSync.stream());
// });



//Watch Sass $ serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./assets"
  });

  gulp.watch(['assets/scss/*.scss'], ['sass']);
  gulp.watch('assets/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);