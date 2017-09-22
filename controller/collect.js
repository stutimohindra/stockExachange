
var collect = {
    collectRequestData: function collectRequestData(req, res, next) {

        var opt = {
            countryCode:req.query.countryCode,
            category:req.query.category,
            baseBid:req.query.baseBid,
        }
        req.collectRequestData = opt;
        next();
    },
}
module.exports = collect;
