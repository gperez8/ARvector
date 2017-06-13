const path = require('path');

module.exports = {
	resolve: {
		extensions: ['.js'],
	},
	context: __dirname,
	entry: './public/assets/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist'),
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
};
