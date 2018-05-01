const Promise = require('bluebird');
const path = require('path');
const util = require('util');

const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const guid = require(path.join(__dirname, '../helpers/guid'));
const audituserquery = require(path.join(__dirname, '../query/audit.user.query'));

const auditdb = db.audit_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function Insert(record){
    var Action = util.format('The new user %s is created by %s. Customer : %s, Branch : %s',record.Name, record.CreatedBy, record.Customer, record.Branch);
    var date = utility.get_local_date_string();
    auditdb.run(audituserquery.INSERT_AUDIT_USER,[
        null,
        Action,
        record.UserId,
        record.Customer,
        record.CustomerId,
        record.Branch,
        record.BranchId,
        date
    ], (err) => {
        if(err){
            errorlog.error(err);
        }
    })
}

module.exports = {
    Insert : Insert
}