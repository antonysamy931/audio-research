const Promise = require('bluebird');

function Insert(record, db){        
    const insertQuery = `INSERT INTO Users VALUES (?,?,?,?,?,?)`;
    db.run(insertQuery,
    [null,record.Name,record.UserName,record.Password,record.Role,new Date().toLocaleDateString()],
    (err) => {
        console.log(err);
    });
}

function GetUsers(db){    
    db.all("Select * from Users", (err,rows)=> {      
        if(err){
            console.log(err);
        }                
        return rows;        
    });
}

function GetUserById(Id, db){    
    db.get("Select * from Users Where Id = ?",[Id],(err,row)=>{        
        if(err){
            console.log(err);
        }                
        return row;
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
    db.all("Select * from Users Where Role = ?",[role],(err,rows)=>{        
        if(err){
            console.log(err);
        }                
        return rows;
    });
}

module.exports = {
    Insert : Insert,
    GetUsers : GetUsers,
    GetUserById : GetUserById,
    GetUsersByRole : GetUsersByRole,
    GetUserByUserNameAndPassword : GetUserByUserNameAndPassword
}

