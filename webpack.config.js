var path = require('path');
var webpack = require('webpack');

module.exports = {

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