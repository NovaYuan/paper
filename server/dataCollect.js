/**
 * Created by Choojen on 2016/12/21.
 */
'use strict';
var mysql = require('mysql');

var Connect = function(){
    //创建数据库连接
    var connect = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'mysql1202',
        database: 'paper',
        port: 3306
    });

    connect.connect(function(err){
        if(err){
            console.error('error connecting:' + err.stack);
            return;
        }
        console.log('connected as id ' + connect.threadId);
    });

    this.connectQuery = function(queryString, req, res, next, callback){
        return connect.query(mysql.format(queryString), function(err, results, fields){
            if(err){
                res.setHeader('Cache-Control', 'no-cache');
                res.writeHead(500, {'Content-Type': 'application/json;charset=utf-8'});
                res.end(JSON.stringify({
                    message: "参数错误"
                }));

                return next(err);
            }

            if(results){
                res.setHeader('Cache-Control', 'no-cache');
                res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
                res.end(JSON.stringify(results));
            }

            if(callback){
                callback();
            }
        })
    };

    this.connectSave = function(req, res, callback){
        var saved = [];
        req.on("data", function(data){
            saved.push(data);
            console.log("服务器接收到的数据：　"+ saved);
        });
        res.on("end", function(insertSql, insertParams){
            connect.query(mysql.format(insertSql), insertParams, function(err, result){
                if(err){
                    console.log('创建失败 - ',err.message);
                    return;
                }else{
                    var success = {};

                    success = {
                        status: "success",
                        content: "创建内容成功!"
                    };
                    res.setHeader('Cache-Control', 'no-cache');
                    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
                    if(callback){
                        callback()
                    }
                    res.end(JSON.stringify(success));
                }
            });
        });
    };

    this.getTypesQuery = function(param){
        var query = "select * from articletypes";

        if(param){
            query = "select * from articles where type = " + connect.escape(param.id)
        }

        return query
    };

    this.getArticleDetail = function(params){
        if(!params.id){
            return false;
        }
        return "select * from articles where id = " + connect.escape(params.id)
    }
};

module.exports = new Connect();