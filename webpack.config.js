// import path from 'path'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    glob = require("glob");

module.exports = {
  //context: path.join(__dirname, 'src/scss'),
  entry: {
      style: glob.sync("./src/scss/*.scss")
  },
  output: {
      path: path.join(__dirname, 'dist/css'),
      filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{loader: 'css-loader', options: {url: false, minimize:true}}, 'sass-loader'],
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: false
    }),
  ],
}