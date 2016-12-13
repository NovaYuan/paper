/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack/hot/dev-server',//正式环境时可注释
        path.join(__dirname, 'src', 'main')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'build.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),  //正式环境时可注释
        new webpack.HotModuleReplacementPlugin(), //正式环境时可注释
        new webpack.NoErrorsPlugin(), //正式环境时可注释
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.sass$/,
                loader: 'style!css!sass'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.sass','.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    devtool: 'cheap-module-eval-source-map'
};