const path = require('path');

module.exports = {
	mode:'development',
	watch : true,
	entry: {
  	bundle : './src/app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: [
    	path.join(__dirname, 'dev'),
    	path.join(__dirname, 'public')
    ],
    compress: true,
    port: 3000
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