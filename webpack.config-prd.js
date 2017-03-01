var debug = false;
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool:null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
    {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
   resolve: {
    alias: {
        react: path.resolve(__dirname, 'node_modules', 'react')
    }
},
  plugins: debug ? [] : [
  new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("production") 
   }
}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};




 

