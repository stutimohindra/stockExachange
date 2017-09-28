'use strict'
var db = require('../dbUtils')
var mysql = require('mysql');

var getDetails = {

    fetch : function (cb) {
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
    setUpdateLock:function (filters,cb) {
    var query = "START TRANSACTION ;" +
        "SELECT * FROM t_details WHERE id=? FOR UPDATE;" +
        "Set autocommit=0;"
    db.executeQuery(query,[filters.id,filters.id] ,function (err, result) {
        if (!err && result) {
            cb(null, result);
        } else {
            console.log("Error while fetching details ");
            console.log(err);
            cb(err);
        }
    });
    },
    updateBudget : function (filters,cb) {
        var query = "update t_details set budget=? where id=?;"+
            "Set autocommit=1";
        db.executeQuery(query,[filters.budget,filters.id] ,function (err, result) {
            if (!err && result) {
                cb(null, result);
            } else {
                console.log("Error while fetching details ");
                console.log(err);
                cb(err);
            }
        });
    },

}
module.exports = getDetails;