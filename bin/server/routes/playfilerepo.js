function GetFilesByUser(Id, db){
    db.all("Select Name From PlayList Where UserId = ?",[Id], (err,rows) => {
        return rows;
    });
}

function Insert(record, db){
    const insertQuery = `INSERT INTO PlayList VALUES (?,?,?,?)`;
    db.run(insertQuery,
    [null,record.Name,record.Userid,new Date().toLocaleDateString()],
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