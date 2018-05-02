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
    return new Promise(function(resolve,reject){
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
            resolve('Success');
        });        
    });    
}

function GetAllCustomers(){
    return new Promise(function(resolve,reject){
        customerdb.all(customerquery.SELECT_ALL_CUSTOMERS,(err,rows) => {
            if(err){
                errorlog.error(err);
            }
            resolve(rows);
        });
    });
}

function CustomerGetById(customerId){
    return new Promise(function(resolve,reject){                
        customerdb.get(customerquery.SELECT_CUSTOMER_BY_ID,[customerId],(err,row) => {            
            if(err){
                errorlog.error(err);
            }
            resolve(row);
        });
    });
}

function Update(record){
    return new Promise(function(resolve,reject){
        var date = utility.get_local_date_string();
        customerdb.run(customerquery.UPDATE_CUSTOMER, [
            record.Description,
            record.UpdatedBy,
            date,
            record.CustomerId
        ],(err) => {
            if(err){
                errorlog.error(err);
            }
        },function(){
            addressrepo.UpdateCustomerAddress(record);
            resolve('Update record successfully');
        });        
    });
}

function Delete(record){
    return new Promise(function(resolve,reject){
        var date = utility.get_local_date_string();
        customerdb.run(customerquery.DELETE_CUSTOMER, [
            0,
            record.UpdatedBy,
            date,
            record.CustomerId
        ],(err) => {
            if(err){
                errorlog.error(err);
            }
        },function(){            
            resolve('Update record successfully');
        });        
    });
}

module.exports = {
    Insert : Insert,
    GetAllCustomers : GetAllCustomers,
    CustomerGetById : CustomerGetById,
    Update : Update,
    Delete : Delete
}