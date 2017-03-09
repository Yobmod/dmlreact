// requirements
var gulp = require('gulp');
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");
var gulpBrowser = require("gulp-browser");  // defunct with webpack-stream?
var del = require('del'); //allows gulp delete files
var size = require('gulp-size'); //tell size of packed file
var webpack = require('webpack-stream');


// tasks
gulp.task('default', function() {
  var stream = gulp.src('./app/*.js') //?
  // .pipe(webpack())
  .pipe(webpack( require('./webpack.config.js') )) //
  .pipe(gulp.dest('./build/'))  // works
  .pipe(size()) //works
  return stream;
});
