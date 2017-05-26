var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var pug = require('gulp-pug');

gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync','sass','pug'], function(){
    gulp.watch('src/sass/**/*.sass',['sass']);
    gulp.watch('src/*.html',browserSync.reload);
    gulp.watch('src/js/**/*.js',browserSync.reload);
    gulp.watch('src/*.pug',['pug']);

});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
})

gulp.task('pug', function(){
    return gulp.src('src/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('build', ['pug','sass', 'useref', 'images'], function (){
  console.log('Building files');
})
