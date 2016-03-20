var path = require("path")
var webpack = require("webpack")
var autoprefixer = require("autoprefixer")
var htmlPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[hash].js",
		publicPath: "/dist/"
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css!postcss")
			},
			{
				test: /\.(png|jpg|gif|ttf|svg|ico)$/,
				loader: "url-loader",
				query: {
					name: "[hash].[ext]",
					limit: 10000,
				}
			}
		]
	},
	postcss: [
		autoprefixer({
			browsers: "> 1%"
		})
	],
	plugins: [
		new ExtractTextPlugin("[contenthash].css"),
		new htmlPlugin({
			template: "./index-tpl.html",
			inject: "body",
			filename: "../index.html"
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "production"
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	externals: {
		vue: "Vue"
	},
	devtool: "source-map"
}
