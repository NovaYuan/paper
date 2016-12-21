/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
var url = require('url');
var path = require('path');
var express = require('express');
var app = express();
var port = 8999;
var connect = require('./server/dataCollect');

(function() {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
})();

//读取静态资源
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));

//监听端口
app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==>Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});


//获取数据
app.get('/types.node', function(req, res) {
    connect.connectQuery(connect.getTypesQuery(), req, res)
});
app.get('/types/:id.node', function(req, res){
    connect.connectQuery(connect.getTypesQuery(req.params), req, res);
});