const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.js'],
	},
	context: __dirname,
	entry: './public/assets/js/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /(\.js|.jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['env', 'es2015'],
			},
		}],
	},
	plugins: [
		new UglifyJSPlugin({
			ecma: 6,
			mangle: false,
        }),
	],
};
