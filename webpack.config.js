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
	  app: __dirname + '/app/index', //entry point, make for each page or load comonent.js for each div. Webpack should codesplit better so can bundle all together?
	  hello: __dirname + '/app/hello',
	  games: __dirname + '/app/games',
	  typescript: __dirname + '/app/typescript',
	  go_container: __dirname + '/app/go_container',
	  patternomaly: __dirname + '/app/patternomaly',

   },
      //devtool: "source-map",// Enable sourcemaps for debugging webpack's output.

   resolve: {
	   // Add '.ts' and '.tsx' as resolvable extensions.
	   extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".jsx", ".js"]
   },

	module: {
		loaders: [
			{	test: /\.(js|jsx)$/,
				exclude: 'node_modules',
				loader: 'babel-loader'	},
			{ 	test: /\.(ts|tsx)?$/,
		  		exclude: 'node_modules',
				loader: "awesome-typescript-loader" }
			],
		//preLoaders: [{ test: /\.js$/, loader: "source-map-loader" } ] // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			},

	externals: {  'jquery': 'jQuery',
				  	'react': 'React',
				    'react-dom': 'ReactDOM'  },

	output: {
		path: __dirname + '/static/js',
		filename: "bundle.[name].js" //names bundles after original entry point files
	},
	//plugins: [new webpack.optimize.CommonsChunkPlugin({name: "hello", filename: "hello.bundle.js"})]
//plugins: [HTMLWebpackPluginConfig, CommonsChunkPluginConfig1, CommonsChunkPluginConfig2]
};
