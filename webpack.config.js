var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

// var HTMLWebpackPlugin = require('html-webpack-plugin');
// var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
// 	template: __dirname + '/app/index.html',
// 	filename: 'index.html',
// 	inject: 'body'
// });
//
// var CommonsChunkPluginConfig1 = new webpack.optimize.CommonsChunkPlugin({
//   name: "vendor",
//   filename: "vendor.js",
//   minChunks: Infinity
//   })
// var CommonsChunkPluginConfig2 = new webpack.optimize.CommonsChunkPlugin({
//     name: "index",
//     filename: "index.js",
//     minChunks: Infinity
//     });


module.exports = {
	entry: __dirname + '/app/index.jsx',
//	{		app: __dirname + '/app/index.js',
		//vendor: ["react", "react-dom"],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: 'node_modules',
				loader: 'babel-loader'
						}
					]
				},
	  externals: {  jquery: 'jQuery',
				  React: 'react',
	 			  ReactDOM: 'react-dom'  },
	output: {
		path: __dirname + '/static/js',
		filename: 'bundle.js'
	},

	//plugins: [HTMLWebpackPluginConfig, CommonsChunkPluginConfig1, CommonsChunkPluginConfig2]
};
