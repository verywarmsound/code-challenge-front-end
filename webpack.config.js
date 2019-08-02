/* eslint-disable no-console,global-require */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function webpackConfig() {
  const env = process.env.NODE_ENV;
  const appEnv = process.env.APP_ENV || 'production';

  const isDev = appEnv === 'development';

  const prodPathPrefix = '/codechallenge/assets/';

  const configFile = isDev ? '/config/development.js' : `${prodPathPrefix}config.js`;

  const config = {
    mode: 'development',
    devServer: {
      port: 8200,
      host: '0.0.0.0',
      historyApiFallback: {
        index: '/'
      },
      proxy: {},
      stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        colors: false,
        depth: false,
        entrypoints: false,
        errors: true,
        errorDetails: true,
        hash: false,
        maxModules: 0,
        modules: false,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        usedExports: false,
        version: false,
        warnings: true
      }
    },
    context: path.resolve('src'),
    entry: './index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve('dist', 'assets'),
      filename: 'app.[hash].js',
      publicPath: isDev ? '/' : prodPathPrefix
    },
    resolve: {
      modules: [path.resolve('src'), path.resolve('node_modules')]
    },
    plugins: [
      // new FaviconsWebpackPlugin('assets/favicon.png'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: isDev ? 'index.html' : '../index.html',
        ts: +new Date(),
        configFile
      })
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            cache: true
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader?name=[name].[hash:base64:6].[ext]&path=images'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader?name=fonts/[name].[hash:base64:6].[ext]'
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    }
  };

  if (env === 'production') {
    config.plugins.push(
      new UglifyJSPlugin({
        sourceMap: true
      })
    );
  }
  return config;
};
