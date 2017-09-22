'use strict';
var mysql = require('mysql');
var configDetails = require('../config').dbConfig
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
            host: configDetails.host,
            port: configDetails.port,
            user: configDetails.user,
            password: configDetails.password,
            database: configDetails.database,
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
