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
  srcDir: path.join(__dirname, 'site'),
  destDir: path.join(__dirname, 'site/css')
}

const convertExtensions = {
  ejs: 'ejs',
  scss: 'scss',
  js: 'js'
}

const entryFileList = {}
Object.keys(convertExtensions).forEach(extension => {
  globule.find([`**/*.${extension}`, `!**/_*.${extension}`], {cwd: opts.srcDir}).forEach(filename => {
    console.log(filename);
    console.log(extension);
    entryFileList[filename.replace(new RegExp(`.${extension}$`, 'i'), '')] = path.join(opts.srcDir, filename)
  })
})

console.log(entryFileList);


module.exports = {
  mode: 'development',
  //context: path.join(__dirname, 'src/scss'),
  // entry: {
  //     style: glob.sync('./src/scss/**/*.scss')
  // },
  entry: entryFileList,
  output: {
      path: path.join(__dirname, 'dist/'),
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