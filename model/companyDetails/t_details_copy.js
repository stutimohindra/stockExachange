'use strict'
var db = require('../dbUtils')
var mysql = require('mysql');
var getDetails = {
    fetch : function (cb) {
        var query = "select * from t_details_copy";
        db.executeQuery(query, function (err, result) {
            if (!err && result) {
                cb(null, result);

            } else {
                console.log("Error while fetching details copy");
                console.log(err);
                cb(err);
            }
        });
    },
}
module.exports = getDetails