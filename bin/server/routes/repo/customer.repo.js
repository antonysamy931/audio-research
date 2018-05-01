const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const customerquery = require(path.join(__dirname, '../query/customer.query'));

const addressrepo = require(path.join(__dirname, './address.repo'));

const customerdb = db.customer_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){
    var customerId = guid.customer_guid();
    var date = utility.get_local_date_string();
    customerdb.run(customerquery.INSERT_CUSTOMER,[
        customerId,
        record.Name,
        record.Description,
        record.CreatedBy,
        date,
        null,
        null,
        1
    ], (err) => {
        if(err){
            errorlog.error(err);
        }
    },function(){
        record.CustomerId = customerId;
        addressrepo.InsertCustomerAddress(record);
    });
}

module.exports = {
    Insert : Insert
}