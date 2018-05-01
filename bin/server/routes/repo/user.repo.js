const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const userquery = require(path.join(__dirname, '../query/user.query'));

const customer_user_repo = require(path.join(__dirname, './customer.user.repo'));
const audit_repo = require(path.join(__dirname, './audit.repo'));
const userdb = db.user_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){        
    const UserId = guid.user_guid();
    const date = utility.get_local_date_string;
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
    },function(){
        audit_repo.Insert(record);
    });
}

function GetUsers(db){
    return new Promise(function(resolve,reject){
        db.all("Select * from Users", (err,rows)=> {      
            if(err){
                console.log(err);
            }                
            resolve(rows);
        });
    });        
}

function GetUserById(Id, db){    
    return new Promise(function(resolve,reject){
        db.get("Select * from Users Where Id = ?",[Id],(err,row)=>{        
            if(err){
                console.log(err);
            }                
            resolve(row);
        });
    });
}

function GetUserByUserNameAndPassword(UserName, Password, db) {
    return new Promise(function(resolve,reject){
        let statement = db.prepare("Select * from Users Where UserName = ? AND Password = ?");
        statement.get([UserName,Password],function(err,row) {
            if(err){
                console.log(err);
            }
            resolve(row);
        });
    });
}

function GetUsersByRole(role, db){
    return new Promise(function(resolve,reject){
        let statement = db.prepare("Select * from Users Where Role = ?");
        statement.all([role],function(err,rows){
            if(err){
                console.log(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    Insert : Insert,
    GetUsers : GetUsers,
    GetUserById : GetUserById,
    GetUsersByRole : GetUsersByRole,
    GetUserByUserNameAndPassword : GetUserByUserNameAndPassword
}

