const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const userquery = require(path.join(__dirname, '../query/user.query'));
const cryptosystem = require(path.join(__dirname, '../helpers/cryptosystem'));

const customer_user_repo = require(path.join(__dirname, './customer.user.repo'));
const audit_repo = require(path.join(__dirname, './audit.repo'));
const userdb = db.user_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){        
    return new Promise(function(resolve, reject){        
        const UserId = guid.user_guid();
        const date = utility.get_local_date_string();
        record.Password = cryptosystem.encrypt(record.Password);        
        userdb.run(userquery.INSERT_USER,
        [
            UserId,
            record.Name,
            record.UserName,
            record.Password,
            record.Role,
            record.CreatedBy, 
            date,
            null,
            null,
            1
        ],
        (err) => {
            errorlog.error(err);            
        },function(){
            record.UserId = UserId;
            customer_user_repo.Insert(record);
            resolve('success');
        });
    });    
}

function GetCustomersUsers(){
    return new Promise(function(resolve,reject){
        userdb.all(userquery.SELECT_ALL_CUSTOMER_USER,(err,rows)=>{
            if(err){
                errorlog.error(err);
            }
            resolve(rows);
        });
    });
}

function GetUserById(Id, db){    
    return new Promise(function(resolve,reject){
        userdb.get("Select * from Users Where Id = ?",[Id],(err,row)=>{        
            if(err){
                console.log(err);
            }                
            resolve(row);
        });
    });
}

function GetBranchUsers(BranchId){
    return new Promise(function(resolve,reject){
        userdb.all(userquery.SELECT_BRANCH_USERS,[BranchId],(err,rows) => {
            if(err){
                errorlog.error(err);
            }
            else{
                resolve(rows);
            }
        })
    });
}


module.exports = {
    Insert : Insert,
    GetCustomersUsers : GetCustomersUsers,
    GetBranchUsers : GetBranchUsers
}
