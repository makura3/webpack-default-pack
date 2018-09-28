const path = require('path')
    // ExtractTextPlugin = require('extract-text-webpack-plugin')


// ディレクトリの設定
const opts = {
  assetsDir: path.join(__dirname, 'src/assets'),
  distDir: path.join(__dirname, '/dist/assets')
}

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(opts.assetsDir, 'js/index.js')
  },
  output: {
    path: opts.distDir,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
      // ,
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           url: false,
      //           minimize:true,
      //           importLoaders: 2
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             require('autoprefixer')({grid: true})
      //           ]
      //         }
      //       },
      //       'sass-loader'],
      //   })
      // }
    ],
  }
  // ,
  // plugins: [
  //   new ExtractTextPlugin({
  //     filename: '[name].css'
  //   }),
  // ],
}