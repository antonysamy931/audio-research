const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const databasePath = path.join(__dirname ,"../db/Audio_Player.db");

let db = new sqlite.Database(databasePath, (err) => {
    if(err){
        console.log(err);
    }    
});

db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS Users(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    UserName TEXT NOT NULL,
    Password TEXT NOT NULL,
    Role TEXT NOT NULL,
    CreatedDate TEXT NOT NULL)`)
    .run(`CREATE TABLE IF NOT EXISTS PlayList(
        Id INTEGER PRIMARY KEY,
        Name TEXT NOT NULL,
        UserId INTEGER NOT NULL,
        CreatedDate TEXT NOT NULL,
        FOREIGN KEY(UserId) REFERENCES Users(Id)
    )`);
});

db.parallelize(() => {
    InsertRecord(db);
});

function InsertRecord(db){
    let query = "SELECT COUNT('') AS Count FROM Users WHERE UserName = ?";
    let param = "admin";
    
    const insertQuery = `INSERT INTO Users VALUES (?,?,?,?,?,?)`;

    var count = 0;        
    db.each(query,[param],(err, row)=>{
        if(err){
            console.log(err);
        }
        count = row.Count;        
    },function(){
        if(count == 0){
            var date = new Date().toLocaleDateString()            
            db.run(insertQuery,[null,"Admin","admin","admin","admin", date],(err) => {
                if(err){
                    console.log(err);
                }                
            });
            db.run(insertQuery,[null,"James","james","abc123","user", date],(err) => {
                if(err){
                    console.log(err);
                }                
            });
            db.run(insertQuery,[null,"Antony","antony","abc123","user", date],(err) => {
                if(err){
                    console.log(err);
                }                
            });
        }
    },function(){        
        //FetchRecord(db);
    });
}

function FetchRecord(db){
    console.log('fetch record');
    db.each(`Select * from Users`,(err,row)=>{
        console.log(row);
    });
}

db.close((err) => {
    if(err){
        console.log(err);
    }
    console.log('SQLite database closed');
});