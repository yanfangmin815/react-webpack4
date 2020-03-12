'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.conf.js');

const node_modules = path.resolve(__dirname, '../node_modules');
const pathToReact = path.resolve(node_modules, 'react/react');
const pathToReactDOM = path.resolve(node_modules,'react-dom/index');

const utils = require('./utils');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
const { NODE_ENV } = process.env
const mode = (NODE_ENV === 'development' ? NODE_ENV : 'production');
// 调试项目启动添加错误
// console.log(env, 'env')
// 1/a0
// 调试项目启动添加错误

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[md5:contenthash:hex:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = merge(baseConfig, {
  mode,
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
        path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    noParse: [pathToReact, pathToReactDOM],
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
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
            include: [paths.appSrc,resolve('node_modules/antd')],
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              // cacheDirectory:true //利用缓存，提高性能，babel is slow
            },
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                Object.assign(
                    {
                      fallback: {
                        loader: require.resolve('style-loader'),
                        options: {
                          hmr: false,
                        },
                      },
                      use: [
                        {
                          loader: require.resolve('css-loader'),
                          options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: shouldUseSourceMap,
                          },
                        },
                        {
                          loader: require.resolve('postcss-loader'),
                          options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
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
                    extractTextPluginOptions
                )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    // 编译进度条
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),

    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     warnings: false,
    //     compress: {
    //       comparisons: false,
    //     },
    //     output: {
    //       /*
    //        是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
    //        可以设置为false
    //       */
    //       beautify: false,
    //       /*
    //        是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
    //       */
    //       comments: false
    //     }
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     // Disabled because of an issue with Uglify breaking seemingly valid code:
    //     // https://github.com/facebookincubator/create-react-app/issues/2376
    //     // Pending further investigation:
    //     // https://github.com/mishoo/UglifyJS2/issues/2011
    //     comparisons: false,
    //   },
    //   mangle: {
    //     safari10: true,
    //   },
    //   output: {
    //     comments: false,
    //     // Turned on because emoji and regex is not minified properly using default
    //     // https://github.com/facebookincubator/create-react-app/issues/2488
    //     ascii_only: true,
    //   },
    //   sourceMap: shouldUseSourceMap,
    // }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
      allChunks: true // webpack4
    }),
    // 配合babel-plugin-lodash按需加载lodash
    new LodashModuleReplacementPlugin(), //webpack4
    // split vendor js into its own file
    /* webpack4 去除此插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
                path.join(__dirname, '../node_modules')
            ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),*/
    // css压缩
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true
      },
      canPrint: true
    }),
    // 删除生产目录
    /*new CleanWebpackPlugin(
        [paths.appBuild],
        ),*/
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ].concat(utils.htmlPlugin()).concat([new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw)]),
  stats: {
    assets: true,
    builtAt: true,
    chunks: false,
    entrypoints: false,
    errorDetails: true,
    modules: false,
    moduleTrace: false,
    providedExports: false,
    usedExports: false,
  }
})
;
