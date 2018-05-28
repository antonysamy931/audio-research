const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const customergroupquery = require(path.join(__dirname, '../query/customer.group.query'));

const addressrepo = require(path.join(__dirname, './address.repo'));

const customerdb = db.customer_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

module.exports = {
    Insert: function(data){
        return new Promise(function(resolve, reject){
            var groupid = guid.group_guid();
            customerdb.run(customergroupquery.INSERT,[
                groupid,
                data.Name,
                data.CustomerId
            ],(err) => {
                if(err){
                    errorlog.error(err);
                }                
            },() => {                 
                data.BranchIds.forEach(BranchId => {
                   customerdb.run(customergroupquery.INSERTGROUPBRANCH,[
                        null,
                        groupid,
                        BranchId
                    ],(err) => {
                        if(err){
                            errorlog.error(err);
                        }
                        resolve('success');
                    });                    
                });
            });
        });        
    },
    Delete: function(data){
        return new Promise(function(resolve, reject){
            customerdb.run(customergroupquery.DELETEGROUP,[data.ID], (err)=>{
                if(err){
                    errorlog.error(err);
                }else{
                    customerdb.run(customergroupquery.DELETEALLBRANCH,[data.ID],(err) => {
                        if(err){
                            errorlog.error(err);
                        }else{
                            resolve("success");
                        }
                    });
                }
            })
        });
    },
    DeleteBranch: function(data){
        return new Promise(function(resolve, reject){
            customerdb.run(customergroupquery.DELETEGROUPBRANCH,[data.ID,data.BranchId],(err) => {
                if(err){
                    errorlog.error(err);
                }else{
                    resolve("success");
                }
            });
        });
    },
    GroupNameExit: function(data){
        return new Promise(function(resolve, reject){
            customerdb.get(customergroupquery.GROUPNAMEEXIST,[data.Name],(err,row)=>{
                if(err){
                    errorlog.error(err);
                }else{                    
                    resolve(row['C'] > 0 ? true : false);
                }
            });
        });
    },
    GroupNameExistUpdate: function(data){
        return new Promise(function(resolve,reject){
            customerdb.get(customergroupquery.GROUPNAMEEXISTUPDATE,[data.Name,data.GroupId],(err,row)=>{
                if(err){
                    errorlog.error(err);
                }else{
                    resolve(row['C'] > 0 ? true : false);
                }
            });
        });
    }
}