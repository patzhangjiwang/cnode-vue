var path = require("path")
var autoprefixer = require("autoprefixer")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "app.js",
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
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader",
				query: {
					name: "[hash].[ext]",
					limit: 10000,
				}
			}
		]
	},
	// babel: {
	// 	presets: ["es2015", "stage-3"],
	// 	plugins: ["transform-runtime"]
	// },
	postcss: [
		autoprefixer({
			browsers: "> 1%"
		})
	],
	plugins: [
		new ExtractTextPlugin("app.css")
	],
	// externals: {
	// 	Vue: "Vue"
	// },
	devtool: "eval-source-map"
}
