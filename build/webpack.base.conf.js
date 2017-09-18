var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.buildDev.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const vuxLoader = require('vux-loader')

// if (process.env.NODE_ENV === 'test') {
//   var config_file = 'api';
//
// } else if (process.env.NODE_ENV === 'prod') {
//   var config_file =  'api';
//
// } else {
//   var config_file = 'api';
//
// }

const webpackConfig = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.buildDev.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.buildProd.assetsPublicPath :process.env.NODE_ENV === 'testing' ? config.buildDev.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'views':path.resolve(__dirname, '../src/views'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint',
      //   include: [
      //     path.join(projectRoot, 'src')
      //   ],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: [
      //     path.join(projectRoot, 'src')
      //   ],
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
