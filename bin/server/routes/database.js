const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const databasePath = path.join(__dirname ,"../db/Audio_Player.db");
console.log(databasePath);

let db = new sqlite.Database(databasePath, (err) => {
    if(err){
        console.log(err);
    }
    //console.log('SQLite database connected');    
});

db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS Users(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    UserName TEXT NOT NULL,
    Password TEXT NOT NULL,
    Role TEXT NOT NULL)`)
    .run(`CREATE TABLE IF NOT EXISTS PlayList(
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        UserId INTEGER NOT NULL,
        FOREIGN KEY(UserId) REFERENCES Users(Id)
    )`);
});

db.parallelize(() => {
    InsertRecord(db);
});

function InsertRecord(db){
    let query = "SELECT COUNT('') AS Count FROM Users WHERE UserName = ?";
    let param = "admin";
    const insertQuery = `INSERT INTO Users VALUES (1,"Admin","admin","admin","admin")`;
    count = 0;
    db.each(query,[param],(err, row)=>{
        if(err){
            console.log(err);
        }
        count = row.Count;        
    });

    if(count == 0){
        console.log(count);
        db.run(insertQuery,(err) => {
            if(err){
                console.log(err);
            }
            console.log(this.lastID);
        });
    }
}

db.close((err) => {
    if(err){
        console.log(err);
    }
    console.log('SQLite database closed');
});