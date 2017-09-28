var common = {
    returnInt :function (value) {
        if(value.indexOf('$') > 0 ){
            var indexOfDollar = value.indexOf('$');
            return (value.substr(0,indexOfDollar)*100)
        }else if(value.indexOf('cent') > 0 ){
            var indexOfCents = value.indexOf('cent');
            return ((value.substr(0,indexOfCents)));
        }
    },
    newBudget: function (budget,bid) {
        if(budget.indexOf('$') > 0 ){
            var indexOfDollar = budget.indexOf('$');
            var newBudget = budget.substr(0,indexOfDollar)*100 - bid;
            if(newBudget >= 100){
                return newBudget/100 + '$'
            }else if(newBudget < 100){
                return newBudget + 'cent'
            }else if(newBudget < 0){
                return -1;
            }

        }else if(budget.indexOf('cent') >0 ){
            var indexOfCents = budget.indexOf('cent');
            var newBudget = budget.substr(0,indexOfDollar) - bid;
            if(newBudget < 0){
                return -1;
            }else {
                return newBudget+'cent';
            }
        }
    }

}
module.exports = common;