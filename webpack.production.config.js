var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    mobile: path.resolve(APP_PATH, 'mobile.js'),
    vendors: ['jquery', 'moment', 'lodash']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=20000'
        // imgSize less than limit will enable base64 
      }
    ]
  },
  plugins: [
    //enable uglify
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //split vendors script
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    //generate two pages
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: true
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: true
    }),
    //provide $, jQuery and window.jQuery to every script
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};