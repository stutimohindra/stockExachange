'use strict';
var mysql = require('mysql');
var configDetails = require('../config')
var dbutil = {
    executeQuery: function queryExecution(customQuery,params,cb) {
        this.getConnection(function (err, connection) {
            if (!err && connection) {
                connection.query(customQuery,params,function (err, rows) {
                    if (!err && rows) {
                        cb(null, rows);
                    } else {
                        cb(err, null);
                    }
                })
                connection.end();
            } else {
                console.error('Could not get the connection.');
                cb(err, null);
            }

        })
    },
    getConnection: function connect(cb) {

        var connection = mysql.createConnection({
            host: configDetails.db[0].host,
            port: configDetails.db[0].port,
            user: configDetails.db[0].user,
            password: configDetails.db[0].password,
            database: configDetails.db[0].database,
            multipleStatements: true
        });
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err);
                cb(err, null);
            } else {
                console.log('connected as id ' + connection.threadId);
                cb(null, connection);
            }

        });

    },

}
module.exports = dbutil
