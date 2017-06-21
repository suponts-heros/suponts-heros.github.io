const HTMLWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
module.exports = {
  entry: {
    'index': './src/js/index.js'
  },
  output: {
    path: require('path').resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(jpg|png|svg|ttf|otf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=sass'
          }
        }
      }
    ]
  },
  plugins: [
    new AppCachePlugin({
      exclude: [/.*\.json$/],
      output: 'cache.manifest'
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true
      }
    })
  ]
};