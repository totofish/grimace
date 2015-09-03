var path               = require('path');
var AssetsPlugin       = require('assets-webpack-plugin');
var webpack            = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var bower_dir          = __dirname + '/bower_components';
var HtmlWebpackPlugin  = require('html-webpack-plugin');



var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    //this.module.noParse.push(new RegExp(path));
  },
  entry: {
    checker:  './src/scripts/checker.js'
  },
  externals: {},
  resolve: { alias: {} },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // CommonsChunkPlugin 會抽取有重複共用的程式獨立在同一包，達到縮小總檔案大小的目的
    new CommonsChunkPlugin('scripts/commons.js'),
    //new CommonsChunkPlugin('scripts/commons.js', ['vendor/jquery', 'vendor/modernizr']),

    // HtmlWebpackPlugin 會自動生成主頁檔案，也可以自已設定樣板檔案
    new HtmlWebpackPlugin({
        filename : 'index.php',
        template : './src/index.php',
        inject: 'head'
    }),
    new AssetsPlugin()   // 輸出資源json參考 webpack-assets.json
  ],
  output: {
    //path: path.join(__dirname, "build", "1.0.0"),
    path: path.join(__dirname, "build"),
    publicPath: "",
    filename: 'scripts/[name].js',
    chunkFilename: "scripts/[name].[hash].js"  // require.ensure動態產生的js會依照這規則
  },
  module: {
    noParse: [],
    loaders: [
      //{ test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      //{ test: /\.html$/, name: "mandrillTemplates", loader: 'raw!html-minify' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=images/[name].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  'html-minify-loader': {
    empty: true,        // KEEP empty attributes
    cdata: true,        // KEEP CDATA from scripts
    comments: true     // KEEP comments
  }
};



config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('modernizr', __dirname + '/src/scripts/vendor/modernizr.custom.82438.js');
config.addVendor('TweenMax', bower_dir + '/gsap/src/minified/TweenMax.min.js');
config.addVendor('TweenLite', bower_dir + '/gsap/src/uncompressed/TweenLite.js');
config.addVendor('TimelineMax', bower_dir + '/gsap/src/uncompressed/TimelineMax.js');
config.addVendor('threejs', bower_dir + '/threejs/build/three.min.js');
config.addVendor('CSS3DRenderer', bower_dir + '/threejs/examples/js/renderers/CSS3DRenderer.js');
config.addVendor('createjs', bower_dir + '/EaselJS/lib/easeljs-0.8.1.min.js');
config.addVendor('tweenjs', bower_dir + '/createjs-tweenjs/lib/tweenjs-0.6.1.min.js');
config.addVendor('movieclip', bower_dir + '/EaselJS/lib/movieclip-0.8.1.min.js');
config.addVendor('bootstrap', __dirname + '/src/scripts/vendor/bootstrap.min.js');
config.addVendor('LZWEncoder', bower_dir + '/GIFEncoder/LZWEncoder.js');
config.addVendor('NeuQuant', bower_dir + '/GIFEncoder/NeuQuant.js');
config.addVendor('b64', __dirname + '/src/scripts/vendor/b64.js');
config.addVendor('GIFEncoder', bower_dir + '/GIFEncoder/GIFEncoder.js');
config.addVendor('main', __dirname + '/src/scripts/main.js');

module.exports = config;


