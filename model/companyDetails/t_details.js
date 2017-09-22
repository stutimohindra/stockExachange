'use strict'
var db = require('../dbUtils')
var mysql = require('mysql');

var getDetails = {

    fetch : function (filters, cb) {
        var query = "select * from t_details";
            db.executeQuery(query, function (err, result) {
                if (!err && result) {
                    cb(null, result);

                } else {
                    console.log("Error while fetching details ");
                    console.log(err);
                    cb(err);
                }
            });
    },
    update : function (filters,cb) {
        var query = "update t_details set budget="+filters.budget +" where id="+filters.id;
        db.executeQuery(query, function (err, result) {
            if (!err && result) {
                cb(null, result);
            } else {
                console.log("Error while fetching details ");
                console.log(err);
                cb(err);
            }
        });
    }
}
module.exports = getDetails;