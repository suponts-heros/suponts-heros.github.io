const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
  entry: {
    'app.js': './src/js/index.js'
  },
  output: {
    path: require('path').resolve(__dirname, 'public'),
    filename: '[name]'
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
        loader: 'eslint-loader'
      },
      {
        test: /\.(jpg|png|svg|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[hash].[ext]'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
            attrs: ['link:href']
          },
        }]
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
    new HTMLWebpackPlugin({
      template: 'src/html/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/json/content.json' }
    ]),
    new AppCachePlugin({
      exclude: [/.*\.json$/],
      output: 'cache.manifest'
    })
  ]
};