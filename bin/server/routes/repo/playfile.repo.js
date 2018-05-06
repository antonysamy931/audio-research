const path = require('path');
const Promise = require('bluebird');
const logger = require(path.join(__dirname, '../helpers/logger'));
const utility = require(path.join(__dirname, '../helpers/utility'));
const db = require(path.join(__dirname, '../helpers/db.instance'));
const audioquery = require(path.join(__dirname, '../query/audio.query'));

const audiodb = db.audio_db;

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

function GetFilesByUser(Id, db){
    return new Promise(function(resolve, reject){
        let statement = db.prepare("Select Name From PlayList Where UserId = ?");
        statement.all([Id],function(err,rows){
            if(err){
                console.log(err);
            }
            resolve(rows);
        });
    });
}

function Insert(record){
    return new Promise(function(resolve, reject){
        const date = utility.get_local_date_string();
        audiodb.run(audioquery.INSERT_AUDIO,[
            null,
            record.Name,
            record.BranchId,
            record.CreatedBy,
            date,
            null,
            null,
            1
        ],(err) => {
            if(err){
                errorlog.error(err);
            }
        },() => {
            resolve('success');
        });
    });
}

function GetFileByBranch(BranchId){
    return new Promise(function(resolve,reject){
        audiodb.get(audioquery.SELECT_PLAYLIST_BY_BRANCHID,[BranchId],(err,row)=>{
            if(err){
                errorlog.error(err);
            }else{
                resolve(row);
            }
        });
    });
}

function Delete(Id, db){
    db.run("Delete from PlayList Where Id = ?",[Id], (err) => {
        if(err){
            console.log(err);
        }
        console.log(this.changes);
    });
}

module.exports = {
    GetFilesByUser : GetFilesByUser,
    Insert : Insert,
    GetFileByBranch : GetFileByBranch
};