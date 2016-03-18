var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

// Common
var config = {

	devtool: 'cheap-module-eval-source-map',

	entry: [
		'./src/index'
	],

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	],

	postcss: [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	],

	resolve: {
		extensions: ['', '.js', '.scss', '.css']
	},
	
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname,
			}
		]
	}

};

// Production
if (process.env.NODE_ENV === 'production')
{
	config.plugins.push(new ExtractTextPlugin('style.css'));

	config.module.loaders.push(
		{
			test: /\.s?css$/,
			loader: ExtractTextPlugin.extract('style', 'css?minimize!postcss!sass')
		}
	);
}

// Development
if (process.env.NODE_ENV === 'development')
{
	config.module.loaders.push(
		{
			test: /\.s?css$/,
			loader: 'style!css!postcss!sass'
		}
	);
}

module.exports = config;