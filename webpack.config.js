var path = require('path');
var	webpack = require('webpack');
var	htmlWebpackPlugin = require('html-webpack-plugin');

// path define
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEMP_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		// mobile: path.resolve(APP_PATH, 'mobile.js'),
		vendors: ['jquery', 'moment', 'lodash']
	},
	ouput: {
		path: BUILD_PATH,
		filename: '[name].[hash].js'
	},
	// enable dev source map
	devtool: 'eval-source-map',
	// enable dev serve
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	module: {
		preLoaders: [
		{
			test: /\.jsx?$/,
			loader: 'jshint-loader',
			include: APP_PATH
		}
		],
		loaders:[
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
			loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
			include: APP_PATH
		},
		{
			test: /\.(jpg|png)$/,
			loader: 'url?limit=10000'
		}
		]
	},
	jshint: {
		"esnext": true
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new htmlWebpackPlugin({
			title: 'Hello World APP',
			template: path.resolve(TEMP_PATH, 'index.html'),
			filename: 'index.html',
			chunks: ['app', 'vendors'],
			inject: true
		}),
		// new htmlWebpackPlugin({
		// 	title: "Hello World Mobile",
		// 	template: path.resolve(TEMP_PATH, 'mobile.html'),
		// 	filename: 'mobile.html',
		// 	chunks: ['mobile', 'vendors'],
		// 	inject: true
		// }),
		// provide $, jQuery and window.jQuery to every script
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	]
};