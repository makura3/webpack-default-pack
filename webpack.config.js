// import path from 'path'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    // glob = require("glob"),
    globule = require('globule');


// //ejsのコンパイル対象のファイルを抽出する。
// const entryFileList = {};
// glob.sync('./src/components/**/!(_*.ejs)').glob.find('_*.ejs').map(function(file) {
//     entryFileList[file.replace(/\.[a-z]+$/, '')] = file;
//   });
//   //entryFileList[file.replace(/\.[a-z]+$/, '')] = file;
// //});

// console.log('--------');

// //scssのコンパイル対象のファイルを抽出する。
// glob.sync('./src/scss/**/!(_*.scss)').map(function(file) {
//   entryFileList[file.replace(/\.[a-z]+$/, '')] = file;
//   console.log(file);
// });

// console.log('--------');
// for (key in entryFileList) {
//   console.log('key:' + key + ' value:' + entryFileList[key]);
// }
// //ディレクトリで切れているものを除外

// ディレクトリの設定
const opts = {
  srcDir: path.join(__dirname, 'src'),
  destDir: path.join(__dirname, '/')
}

const filePathList = {
  ejs: '/',
  scss: 'site/css/',
  js: 'js'
}

const entryFileList = {}

Object.keys(filePathList).forEach(extension => {
  globule.find([`**/*.${extension}`, `!**/_*.${extension}`], {cwd: opts.srcDir}).forEach(filename => {
    if(extension == 'ejs') {
      entryFileList[path.join(filePathList[extension], filename.replace(new RegExp(`.${extension}$`, 'i'), '.html').replace(new RegExp(`^components/`, 'i'), ''))] = path.join(opts.srcDir, filename)
    } else if(extension == 'scss'){
      entryFileList[path.join(filePathList[extension], filename.replace(new RegExp(`.${extension}$`, 'i'), '.css').replace(new RegExp(`^${extension}/`, 'i'), ''))] = path.join(opts.srcDir, filename)
    } else {
      entryFileList[filename.replace(new RegExp(`.${extension}$`, 'i'), '')] = path.join(opts.srcDir, filename)
    }
  })
})

console.log(entryFileList);


module.exports = {
  mode: 'development',
  entry: entryFileList,
  output: {
    path: opts.destDir,
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ExtractTextPlugin.extract({
          use: ['apply-loader', 'ejs-compiled-loader'],
        })
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