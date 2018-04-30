const uuidv1 = require('uuid/v1');

function customer_guid(){
    return "cust"+uuidv1();
}

function branch_guid(){
    return "branch"+uuidv1();
}

function user_guid(){
    return "user"+uuidv1();
}

module.exports = {
    customer_guid : customer_guid,
    branch_guid : branch_guid,
    user_guid : user_guid
};