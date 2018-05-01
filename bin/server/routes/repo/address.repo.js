const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const addressquery = require(path.join(__dirname, '../query/address.query'));

const customerdb = db.customer_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function InsertCustomerAddress(record){    
    var date = utility.get_local_date_string();
    customerdb.run(addressquery.INSERT_CUSTOMER,[
        null,
        record.AddressLine1,
        record.AddressLine2,
        record.City,
        record.State,
        record.CustomerId,
        null,
        1
    ], (err) => {
        if(err){
            errorlog.error(err);
        }
    });
}

function InsertBranchAddress(record){    
    var date = utility.get_local_date_string();
    customerdb.run(addressquery.INSERT_CUSTOMER,[
        null,
        record.AddressLine1,
        record.AddressLine2,
        record.City,
        record.State,
        null,
        record.BranchId,
        1
    ], (err) => {
        if(err){
            errorlog.error(err);
        }
    });
}

module.exports = {
    InsertCustomerAddress : InsertCustomerAddress,
    InsertBranchAddress : InsertBranchAddress
}