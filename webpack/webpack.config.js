const path = require('path');
const webpack = require('webpack');
const __debug= true;
const replacePlugin = require('./replace');
module.exports = {
    entry: {
        main: './src/index.js',
    },
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        modules: [
            path.join(__dirname, '../react/packages'),
            'node_modules',
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: /(?:react\/packages)|src/,
                options: {
                    babelrc: false,
                    exclude: /node_modules/,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    esmodules: true,
                                    browsers: "> 0.25%, not dead"
                                },
                                debug: __debug,
                                modules: 'umd',
                                forceAllTransforms: !__debug,
                                useBuiltIns: false
                            }
                        ],
                        [
                            "@babel/preset-react",
                            {
                                development: true
                            }
                        ],
                        '@babel/preset-flow'
                    ],
                    plugins: [
                        [
                            require('../react/scripts/babel/transform-replace-console-calls'),
                            {
                                shouldError: false,
                            },
                        ],
                        require('../react/scripts/error-codes/transform-error-messages'),
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread'
                    ]
                }
            },
        ]
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: 'true',
            __PROFILE__: 'true',
            __UMD__: 'true',
            'process.env.NODE_ENV': "'development'",
            __EXPERIMENTAL__: true,
            __VARIANT__: false
          }),
        new replacePlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3100
    }
}