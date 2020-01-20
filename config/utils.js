'use strict'
const path = require('path');
const PAGE_PATH = path.join(__dirname, '../src/html');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const paths = require('./paths')
const entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
// 多入口配置 获取js文件
exports.entries = function() {
    var map = {}
    entryFiles.forEach((filePath) => {
        var file = filePath.slice(filePath.indexOf('src'))
        var filename = filePath.substring(filePath.indexOf('html')+5,filePath.lastIndexOf('\/'))
        map[filename] = []
        map[filename] = [
            require.resolve('./polyfills'),
            require.resolve(`../src/html/${filename}/index.js`)
        ]
        if (process.env.NODE_ENV === 'development') {
            map[filename] = [
                'react-hot-loader/patch',
                require.resolve('./polyfills'),
                require.resolve('react-dev-utils/webpackHotDevClient'),
                require.resolve(`../src/html/${filename}/index.js`),
            ]
        }
    })
    return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
    let arr = []
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.indexOf('html')+5,filePath.lastIndexOf('\/'))
        let conf = {
            // 模板来源
            template: paths.appHtml,
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: [filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
                // chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}

// 本地入口文件映射到dist打包文件
exports.localEntry = function () {
    var map = []
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i]
        var unit = {}
        var filename = filePath.substring(filePath.indexOf('html')+5,filePath.lastIndexOf('\/'))
        if (filename == 'index') {
            continue
        }
        unit.from = `/^\\/${filename}.html`
        unit.to = `/build/${filename}.html`
        map.push(unit)
    }
    return map
}
