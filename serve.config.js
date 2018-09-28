var serve = require("webpack-serve")
serve({ config: './webpack.config.js', content: 'dist/', open: true, host: '127.0.0.1' })