'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // webpack4 进度显示
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const baseConfig = require('./webpack.base.conf.js');
const fs = require('fs')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//引入模块
const Jarvis = require("webpack-jarvis");
const getClientEnvironment = require('./env');
const utils = require('./utils');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);
const { NODE_ENV } = process.env
const mode = (NODE_ENV === 'development' ? NODE_ENV : 'production');

// 1/a0
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseConfig, {
  mode, // webpack4
  // 更改multiple-in
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      // {
      //   test: /\.(js|jsx|mjs)$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       options: {
      //         // formatter: eslintFormatter,
      //         eslintPath: require.resolve('eslint'),
      //       },
      //       loader: require.resolve('eslint-loader'),
      //     },
      //   ],
      //   include: paths.appSrc,
      //   exclude: /node_modules/ // webpack4
      // },
     
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: [
                'react-hot-loader/babel', 
                'lodash', 
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import'],
            },
          },
         
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new Jarvis({
      port: 1337 // optional: set a port
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        logLevel: 'info'
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }), // webpack4 进度显示
    new LodashModuleReplacementPlugin(), // webpack4 智能处理lodash包
    new webpack.HotModuleReplacementPlugin(),
    // new InterpolateHtmlPlugin(env.raw),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ].concat(utils.htmlPlugin()).concat([new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw)]),
  performance: {
    hints: false,
  },
});
