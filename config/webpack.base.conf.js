const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');
const utils = require('./utils');
const paths = require('./paths');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfig = {
    // 更改multiple-in
    entry: utils.entries(),
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            '@': resolve('src'),
            'react-native': 'react-native-web'
        },
        plugins: [
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    optimization: {
        // 包清单
        runtimeChunk: {
            name: 'manifest'
        },
        mergeDuplicateChunks: true,
        // 拆分公共包
        splitChunks: {
            cacheGroups: {
                // 项目公共组件
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                // 第三方组件
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    }
}

module.exports = baseConfig;
