import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dest'),
  },
  module: {
    rules: [
      {test: /\.css$/, use: ExtractTextPlugin.extract({use: 'css-loader'})}
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
}