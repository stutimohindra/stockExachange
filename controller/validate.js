'use strict'
var validate = {
    validateRequestData: function validateRequestData(req, res, next) {

        if (req.query.countryCode != undefined && req.query.category != undefined && req.query.baseBid != undefined){
           next();
        }else {
            res.status(400).json({
                error: -1,
                message: "Missing params"
            })
        }

    },
}
module.exports = validate;