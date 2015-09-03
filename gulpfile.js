'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'), // 文件合併
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'), // 防止因錯誤而跳掉gulp，會秀出錯誤原因，比較好找原因
    del = require('del'); // 跟gulp-clean一樣也是清除檔案，但用法比較簡單

var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");



var onError = function(err) {
  console.log(err); // 詳細錯誤訊息
  notify().write(err); // 簡易錯誤訊息
  this.emit('end'); // 中斷程序不往下走
}


gulp.task("webpack", function(callback) {
    // run webpack
    var Config = Object.create(webpackConfig);
    if(process.env.DEPLOY === "1"){
      Config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        // 壓縮js文件等同 webpack -p 但好像快一些
        compress: {
          warnings: false
        }
      }));
    }

    webpack( Config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var Config = Object.create(webpackConfig);
    Config.devtool = "eval";
    Config.debug = true;

    var compiler = webpack( Config );
    
    new WebpackDevServer(compiler, {
        publicPath: Config.output.publicPath,
        stats: {
          colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});





// copy File
gulp.task('copyFile', ['copyAPI'], function() {
    return gulp.src(['src/*.png','src/*.ico', 'src/close.php'])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build'))
});

gulp.task('copyAPI', function() {
    return gulp.src('src/api/**/*')
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(gulp.dest('build/api'))
});



// Clean
gulp.task('clean', function(cb) {
    del(['build/scripts', 'build/images', 'build'], cb);
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start(['copyFile', 'webpack']);
});


// Server
gulp.task('server', function() {
    gulp.start('webpack-dev-server');
});