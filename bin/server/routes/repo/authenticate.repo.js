const Promise = require('bluebird');
const path = require('path');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const authenticatequery = require(path.join(__dirname, '../query/authenticate.query'));

const customerdb = db.customer_db;
const userdb = db.user_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Login(username, password){    
    return new Promise(function(resolve, reject){
        userdb.get(authenticatequery.VALID_USER,[username,password],(err,row) => {
            if(err){
                errorlog.error(err);                
            }
            resolve(row);
        });
    });    
}

module.exports = { Login }