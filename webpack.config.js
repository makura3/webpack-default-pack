const path = require('path')
const globule = require('globule')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
// const HtmlWebpackPlugin = require('html-webpack-plugin')


// ディレクトリの設定
const opts = {
  srcDir: path.join(__dirname, 'src'),
  assetsDir: path.join(__dirname, './src/assets'),
  distDir: path.join(__dirname, './dist')
}

// エントリーファイルの抽出
const filePathList = {
  scss: 'css',
  js: 'js'
}

const entryFileList = {}

console.log('  ----- find file. -----  ');
Object.keys(filePathList).forEach(extension => {
  globule.find([`**/*.${extension}`, `!**/_*.${extension}`], {cwd: opts.srcDir}).forEach(filename => {
    if(extension == 'scss') {
      entryFileList[filename.replace(new RegExp(`.${extension}$`, 'i'), '').replace(`\/${extension}`, '/css')] = path.join(opts.srcDir, filename)
    } else {
      entryFileList[filename.replace(new RegExp(`.${extension}$`, 'i'), '')] = path.join(opts.srcDir, filename)
    }
  })
})
console.log(entryFileList);
console.log('  ----------------------  ');

module.exports = {
  mode: 'development',
  entry: entryFileList,
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
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize:true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({grid: true})
              ]
            }
          },
          'sass-loader'],
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
    })
    // ,
    // new HtmlWebpackPlugin()
  ]
}