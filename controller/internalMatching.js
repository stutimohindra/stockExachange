
var details = require('../model/companyDetails/t_details')
var common = require('./common')
var async = require('async')
var baseTargeting = {

    matchBaseTargeting: function matchBaseTargeting(req, res, next) {
        var opt = {
            countryCode: req.collectRequestData.countryCode,
            category: req.collectRequestData.category,
        }
        details.fetch(opt, getDetails);
        function getDetails(err, response) {
            if (!err && response.length > 0) {
                console.log("BaseTargeting:")
                var responseBaseTarget = response.filter(function (object) {
                    if (object.category.indexOf(opt.category) > -1 && object.countries.indexOf(opt.countryCode) > -1) {
                        console.log('{'+object.companyId,',Passed'+'}')
                        return object;
                    }else {
                        console.log('{'+object.companyId,',Failed'+'}')
                    }
                })
                req.responseBaseTarget = responseBaseTarget;
                next();
            }else if(!err && response.length == 0){
                res.send("No Companies Passed from Targeting");
            }else if(err){
                res.send(new Error('Error occurred while fetching base target'));
            }
        }
    },
    budgetCheck : function (req,res,next) {
        var requestDetails = req.responseBaseTarget
        console.log("BudgetCheck:")
        var matchedbudgetCheckResponse = requestDetails.filter(function (object) {
            if (common.returnInt(object.budget) > req.query.baseBid) {
                console.log('{'+object.companyId,',Passed'+'}')
                return object;
            }else {
                console.log('{'+object.companyId,',Failed'+'}')
            }
        })
        req.budgetCheckResponse = matchedbudgetCheckResponse;
        next();
    },
    baseBidCheck: function (req,res,next) {
        var requestDetails = req.budgetCheckResponse
        console.log("BaseBid:")
        var matchedbaseBidResponse = requestDetails.filter(function (object) {
            if ( parseInt(common.returnInt(object.bid)) <  parseInt(req.query.baseBid)) {
                console.log('{'+object.companyId,',Passed'+'}')
                return object;
            }else {
                console.log('{'+object.companyId,',Failed'+'}')
            }
        })
        req.budgetCheckResponse = matchedbaseBidResponse;
        next();
    },
    shortListing: function (req,res,next) {
        var requestDetails = req.budgetCheckResponse
        var winner = requestDetails.map(function (object) {
            return parseInt(common.returnInt(object.bid))
        }).reduce(function (prev,curr) {
            return prev > curr ? prev : curr;
        });
        console.log("Winner:",winner)
        var matchedWinners = requestDetails.map(function (object) {
            if (object.bid == winner+'cent') {
                console.log("{"+object.companyId+"}")
                return object;
            }
        })
        req.winnerDetails = matchedWinners
        next();
    },
    updateBudget: function (req,res,next) {
        var requestDetails = req.winnerDetails[0]
        var newBudget = common.newBudget(requestDetails.budget, req.query.baseBid);
        var opt = {
            id: requestDetails.id,
            budget : newBudget
        }
        async.waterfall([
           function update(cb) {
                details.setUpdateLock(opt,function (error,result) {
                    if(error){
                        res.send(new Error('Error occurred while updating budget for companyId'+requestDetails.id));
                    }else if(!error && result){
                        cb(null,result)
                    }
                })
           },
            function releaseUpdate(result,cb) {
                details.update(opt,function (error,response) {
                    if(error){
                        res.send(new Error('Error occurred while updating budget for companyId'+requestDetails.id));
                    }else if(!error && response){
                        cb(null,response)
                    }
                })
            },

        ], function (error, success) {
            if (error) {
                res.send(new Error('Error occurred while updating budget for companyId'+requestDetails.id));
            }
            else if(!error && success){
                res.status(200).json({
                    error: 0,
                    message: "successfully updated budget"
                })
            };
        });


    }
}
module.exports = baseTargeting;