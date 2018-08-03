var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open');


//return 代表异步执行task,没有则是同步执行
gulp.task('js',function(){
  return gulp.src('./src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload())//实时编译
        .pipe(connect.reload())//实时刷新
});

gulp.task('less',function(){
  return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/'))
        .pipe(livereload())
        .pipe(connect.reload())
});

//这里的参数表示先执行完less,再接着完成css
gulp.task('css',['less'],function(){
  return gulp.src('src/css/*.css')
          .pipe(concat('bundle.css'))
          .pipe(rename({suffix:'.min'}))
          .pipe(cleanCss({compatibility:'ie8'}))
          .pipe(gulp.dest('dist/css/'))
          .pipe(livereload())
          .pipe(connect.reload())
});

gulp.task('html',function(){
  return gulp.src('src/index.html')
        .pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
        .pipe(connect.reload())
});

gulp.task('watch',['default'],function(){
  //开始监听
  livereload.listen();
  gulp.watch('src/js/*.js',['js'])
  gulp.watch(['src/css/*.css','src/less/*.less'],['css'])//css已包含less编译
});

gulp.task('server',['default'],function(){
  connect.server({
    root: 'dist/',
    livereload: true, //实时刷新
    port: 5000
  });
  open('http://localhost:5000/')
  gulp.watch('src/js/*.js',['js'])
  gulp.watch(['src/css/*.css','src/less/*.less'],['css'])
});

gulp.task('default',['js','less','css','html'])
