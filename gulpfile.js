// requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var size = require('gulp-size'); // tell size of packed file
// var gutil = require("gulp-util"); // gutil.log('') // gutil.replaceExtension('src.x', '.y') // gutil.file // gutil.template
//var gulpBrowser = require("gulp-browser");  // allows browserify without webpack
//var del = require('del'); // allows gulp delete files

var webpack = require('webpack');
var webpackstream = require('webpack-stream');
var webpackconfig = require('./webpack.config.js');
var exec = require('child_process').exec; // run commands eg. python app.py
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default',
	['webpacking', 'sassing', 'lessing', 'runserver', 'watching']
		// , function () {
		// 	browserSync({
  // 				notify: false,
  // 				proxy: "127.0.0.1:5000"
		// 	});
			//gulp.watch(['.app/*.jsx', '.app/*.tsx'],['webpacking']);
			//, function () { return gulp.watch('.app/style/*.scss', ['sassing']);}
	);


gulp.task('watching', function() {
	gulp.watch(['./app/*.jsx', './app/*.tsx', './app/**/*.js', './app/**/*.tsx', './app/**/*.jsx'], ['webpacking']);
	gulp.watch('./app/**/*.scss', ['sassing']);
	gulp.watch('./app/**/*.less', ['lessing']);
	gulp.watch('./templates/*.*', ['runserver']);
});


gulp.task('webpacking', function() {
  var stream = gulp.src('./app/*') // Tells gulp where to look for source files?
  .pipe(webpackstream(webpackconfig, webpack)) // does webpack using the config file
  .pipe(gulp.dest('./static/js/'))  // adds another output destination if different from webpack.config
  .pipe(size()) // gived sum of packed package sizes
  return stream;
});

gulp.task('sassing', function() {
	return gulp.src('./app/style/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('./static/css/'))
   .pipe(size());
});

gulp.task('lessing', function() {
	return gulp.src('./app/style/*.less')
   .pipe(less())
   .pipe(gulp.dest('./static/css/'))
   .pipe(size())
});

gulp.task('runserver', function() {
    var proc = exec('python app.py');
	return proc
})

gulp.task('endserver', function() {
    var proc = exec('kill -INT 888');
	return proc
})
