const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const branchquery = require(path.join(__dirname, '../query/branch.query'));

const addressrepo = require(path.join(__dirname, './address.repo'));

const customerdb = db.customer_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){
    return new Promise(function(resolve,reject){
        var branchId = guid.branch_guid();
        var date = utility.get_local_date_string();
        customerdb.run(branchquery.INSERT_BRANCH,[
            branchId,
            record.Name,
            record.Description,
            record.CustomerId,
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
            record.BranchId = branchId;
            addressrepo.InsertBranchAddress(record);
            resolve('Updated');
        });
    });    
}

function GetAllBranches(){
    return new Promise(function(resolve,reject){
        customerdb.all(branchquery.GET_ALL_BRANCHES,(err,rows) => {
            if(err){
                errorlog.error(err);
            }
            resolve(rows);
        });
    });
}

function GetCustomerBranches(customerId){
    return new Promise(function(resolve,reject){
        customerdb.all(branchquery.GET_CUSTOMER_BRANCHES,[customerId],(err,rows) => {
            if(err){
                errorlog.error(err);
            }
            resolve(rows);
        });
    });
}

function BranchGetById(branchId){
    return new Promise(function(resolve,reject){                
        customerdb.get(branchquery.SELECT_Branch_BY_ID,[branchId],(err,row) => {            
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
        customerdb.run(branchquery.UPDATE_BRANCH, [
            record.Description,
            record.UpdatedBy,
            date,
            record.BranchId
        ],(err) => {
            if(err){
                errorlog.error(err);
            }
        },function(){
            addressrepo.UpdateBranchAddress(record);
            resolve('Update record successfully');
        });        
    });
}

function Delete(record){
    return new Promise(function(resolve,reject){
        var date = utility.get_local_date_string();
        customerdb.run(branchquery.DELETE_BRANCH, [
            0,
            record.UpdatedBy,
            date,
            record.BranchId
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
    GetAllBranches : GetAllBranches,
    GetCustomerBranches : GetCustomerBranches,
    BranchGetById : BranchGetById,
    Update : Update,
    Delete : Delete
}