const path = require('path');

module.exports = {
	mode:'production',
	watch : false,
	entry: {
  	bundle : './src/app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
	  rules: [
	    {
	      test: /\.m?js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env'],
	          plugins: [
	          	'@babel/plugin-proposal-class-properties', 
	          	"@babel/plugin-proposal-private-methods"
	          ],
	        }
	      }
	    },
	    {
      	test: /\.css$/i,
      	use: ['style-loader', 'css-loader'],
    	},
    	{
      	test: /\.s[ac]ss$/i,
      	use: [ 'style-loader', 'css-loader', 'sass-loader']
    	},
	  ]
	}
};