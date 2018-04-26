const Promise = require('bluebird');

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

function Insert(record, db){
    const insertQuery = `INSERT INTO PlayList VALUES (?,?,?,?)`;
    db.run(insertQuery,
    [null,record.Name,record.UserId,new Date().toLocaleDateString()],
    (err) => {
        console.log(err);
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
    Delete : Delete
};