const path = require('path');
const sqlite = require('sqlite3').verbose();

const databaseAudioPath = path.join(__dirname ,"../../db/audio_player.db");
const databaseUserPath = path.join(__dirname, "../../db/user_master.db");
const databaseCustomerPath = path.join(__dirname, "../../db/customer_master.db");
const databaseAuditPath = path.join(__dirname, "../../db/audit_master.db");

const logger = require(path.join(__dirname, 'logger'));

var exports = module.exports = {};

exports.audio_db = new sqlite.Database(databaseAudioPath, (err) => {
    if(err){
        errorlog.error(err);
    }    
});

exports.user_db = new sqlite.Database(databaseUserPath, (err) => {
    if(err){
        errorlog.error(err);
    }    
});

exports.customer_db = new sqlite.Database(databaseCustomerPath, (err) => {
    if(err){
        errorlog.error(err);
    }    
});

exports.audit_db = new sqlite.Database(databaseAuditPath, (err) => {
    if(err){
        errorlog.error(err);
    }    
});
