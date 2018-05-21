const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const socketquery = require(path.join(__dirname, '../query/socket.current.users.query'));

const socketdb = db.socket_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

module.exports = {
    Insert: function(record){
        socketdb.run(socketquery.INSERT,[
            null,
            record.UserId,
            record.CustomerId,
            record.BranchId
        ], (err) => {
            if(err){
                errorlog.error(err);
            }
        });
    },
    Delete: function(user){
        socketdb.run(socketquery.DELETE,[user],(err)=>{
            if(err){
                errorlog.error(err);
            }
        });
    },
    UserExist: function(user){
        return new Promise(function(resolve,reject){
            socketdb.get(socketquery.USEREXIT,[user],(err,row) => {
                if(err){
                    errorlog.error(err);
                }
                resolve(row);
            });
        });
    },
    GetCustomers: function(){
        return new Promise(function(resolve,reject){
            socketdb.all(socketquery.CUSTOMERS,[],(err, rows) => {
                if(err){
                    errorlog.error(err);
                }
                resolve(rows);
            })
        });
    },
    GetCustomerBranches: function(customer){
        return new Promise(function(resolve,reject){
            socketdb.get(socketquery.BRANCHES,[],(err,rows) => {
                if(err){
                    errorlog.error(err);
                }
                resolve(rows);
            });
        });
    }
}
