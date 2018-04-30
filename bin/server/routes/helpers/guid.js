const uuidv1 = require('uuid/v1');

var exports = module.exports = {};
    
exports.customer_guid = function(){
    return "cust"+uuidv1();
};

exports.branch_guid = function(){
    return "branch"+uuidv1();    
};

exports.user_guid = function(){
    return "user"+uuidv1();
}