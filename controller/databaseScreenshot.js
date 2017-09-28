'use strict'
var detailsCopy = require('../model/companyDetails/t_details_copy')
var details = require('../model/companyDetails/t_details')

var common = require('./common')

var dataBaseChanges = {
    getUpdates : function (req,res,next) {
        detailsCopy.fetch(function (error,response) {
            if(error){
                res.send(new Error('Error occurred while fetching data base updates'));
            }else if(!error && response){
                res.status(200).json({
                    error: 0,
                    message: response
                })
            }
        })
    },
    getData: function (req,res,next) {
        details.fetch(function (error,response) {
            if(error){
                res.send(new Error('Error occurred while fetching data base '));
            }else if(!error && response){
                res.status(200).json({
                    error: 0,
                    message: response
                })
            }
        })
    }
}
module.exports = dataBaseChanges;