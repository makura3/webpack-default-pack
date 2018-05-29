// import path from 'path'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    glob = require("glob");

const entries = {};
glob.sync('./src/scss/**/*.scss').map(function(file) {
  entries[file.replace(/\.[a-z]+$/, '')] = file;
});

module.exports = {
  mode: 'development',
  //context: path.join(__dirname, 'src/scss'),
  // entry: {
  //     style: glob.sync('./src/scss/**/*.scss')
  // },
  entry: entries,
  output: {
      path: path.join(__dirname, 'src/css/'),
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
      filename: '[name].css',
      allChunks: false
    }),
  ],
}