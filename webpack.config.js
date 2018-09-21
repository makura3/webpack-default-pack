const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// ディレクトリの設定
const opts = {
  srcDir: path.join(__dirname, 'src'),
  destDir: path.join(__dirname, '/public')
}

module.exports = {
  mode: 'development',
  entry: {
    js: path.join(srcDir, 'hogehoge'),
    style: path.join(srcDir, 'hugahuga'),
  },
  output: {
    path: opts.destDir,
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },
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
      filename: '[name]',
      allChunks: false
    }),
  ],
}