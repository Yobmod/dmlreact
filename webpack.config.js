var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

// var HTMLWebpackPlugin = require('html-webpack-plugin');
// var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
// 	template: __dirname + '/app/index.html',   //put templates here to webpack
// 	filename: 'index.html',
// 	inject: 'body'
// });
//
// var CommonsChunkPluginConfig1 = new webpack.optimize.CommonsChunkPlugin({
//   name: "vendor",
//   filename: "vendor.js",
//   minChunks: Infinity
//   })
//

module.exports = {
  entry: {
	  app: __dirname + '/app/index.jsx', //entry point, make for each page or load comonent.js for each div. Webpack should codesplit better so can bundle all together?
	  hello: __dirname + '/app/hello.jsx',
	  games: __dirname + '/app/games.jsx',

	
   },

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
				  underscore: 'underscore',
	 			  ReactDOM: 'react-dom'  },
	output: {
		path: __dirname + '/static/js',
		filename: "bundle.[name].js" //names bundles after original entry point files
	},
	//plugins: [new webpack.optimize.CommonsChunkPlugin({name: "hello", filename: "hello.bundle.js"})]
//plugins: [HTMLWebpackPluginConfig, CommonsChunkPluginConfig1, CommonsChunkPluginConfig2]
};
