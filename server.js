/**
 * Created by Choojen on 2016/12/13.
 */
'use strict';
var url = require('url');
var path = require('path');
var express = require('express');
// var favicon = require('serve-favicon');
// var httpProxy = require('http-proxy');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var app = express();
var port = 8999;
// var proxy = httpProxy.createProxyServer(); // See (†)

//app.use(favicon(__dirname + '/favicon.ico'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));

(function() {

    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
})();

// app.get('*', function(req, res) {
//     //res.sendFile(path.join(__dirname, 'index.html'));
//     var pathname = url.parse(req.url).pathname;
//
//     if(pathname.indexOf('/wpy_gab') == 0) {
//         //112.74.111.78:8080(阿里云)  10.0.103.94:8082(士左) 127.0.0.1:8080  10.0.103.49:8080(萌新)
//         proxy.web(req, res, {target: 'http://10.0.103.128:8080/'}, function (e) {
//             console.log('e:' + e)
//         });
//     }
// });
//
// app.post("*", function(req, res){
//     var pathname = url.parse(req.url).pathname;
//
//     if(pathname.indexOf('/wpy_gab') == 0) {
//         proxy.web(req, res, { target: 'http://10.0.103.128:8080/' }, function(e){
//             console.log('e:' + e)
//         });
//     }
// });

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==>Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});