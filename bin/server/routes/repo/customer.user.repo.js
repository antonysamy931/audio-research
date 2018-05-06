const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const customeruserquery = require(path.join(__dirname, '../query/customer.user.query'));

const userdb = db.user_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){    
    const date = utility.get_local_date_string();
    userdb.run(customeruserquery.INSERT_CUSTOMER_USER,[
        null,
        record.UserId,
        record.CustomerId,
        record.BranchId,
        record.CreatedBy,
        date,
        null,
        null,
        1
    ],(err) => {
        if(err){
            errorlog.error(err);
        }        
    });
}

module.exports = {
    Insert : Insert
}