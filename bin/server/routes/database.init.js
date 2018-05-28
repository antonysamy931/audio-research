const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const guid = require(path.join(__dirname,'./helpers/guid'));
const crypto = require(path.join(__dirname,'./helpers/cryptosystem'));
const logger = require(path.join(__dirname, './helpers/logger'));
const db = require(path.join(__dirname, './helpers/db.instance'));

const errorlog = logger.getLogger('error');
const infolog = logger.getLogger('info');
const debuglog = logger.getLogger('debug');

db.customer_db.serialize(() => {
    db.customer_db.run(`CREATE TABLE IF NOT EXISTS Customer(
        ID TEXT NOT NULL PRIMARY KEY,
        Name TEXT NOT NULL,
        Description TEXT NOT NULL,
        CreatedBy TEXT NULL,
        CreatedDate TEXT NULL,
        UpdatedBy TEXT NULL,
        UpdatedDate TEXt NULL,
        Active INTEGER DEFAULT 1
    )`)
    .run(`CREATE TABLE IF NOT EXISTS Branch(
        ID TEXT NOT NULL PRIMARY KEY,
        NAME TEXT NOT NULL,
        Description TEXT NOT NULL,
        CustomerId TEXT NOT NULL,
        CreatedBy TEXT NULL,
        CreatedDate TEXT NULL,
        UpdatedBy TEXT NULL,
        UpdatedDate TEXT NULL,
        Active INTEGER DEFAULT 1,
        FOREIGN KEY(CustomerId) REFERENCES Customer(ID)
    )`).run(`CREATE TABLE IF NOT EXISTS Address (
        ID INTEGER PRIMARY KEY,
        AddressLine1 TEXT NULL,
        AddressLine2 TEXT NULL,
        City TEXT NULL,
        State TEXT NULL,
        CustomerId TEXT NULL,
        BranchId TEXT NULL
    )`).run(`CREATE TABLE IF NOT EXISTS CustomerGroup(
        ID TEXT PRIMARY KEY,
        Name TEXT NOT NULL,        
        CustomerId TEXT NOT NULL,
        FOREIGN KEY(CustomerId) REFERENCES Customer(ID)
    )`).run(`CREATE TABLE IF NOT EXISTS GroupBranches(
        ID INTEGER PRIMARY KEY,
        GroupId TEXT NOT NULL,
        BranchId TEXT NOT NULL,
        FOREIGN KEY(GroupId) REFERENCES CustomerGroup(ID),
        FOREIGN KEY(BranchId) REFERENCES Branch(ID)
    )`); 
});

db.user_db.serialize(() => {
    db.user_db.run(`CREATE TABLE IF NOT EXISTS Users(
        ID TEXT NOT NULL PRIMARY KEY,
        Name TEXT NOT NULL,
        UserName TEXT NOT NULL,
        Password TEXT NOT NULL,
        Role TEXT NOT NULL,
        CreatedBy TEXT NULL,
        CreatedDate TEXT NULL,
        UpdatedBy TEXT NULL,
        UpdatedDate TEXT NULL,
        Active INTEGER DEFAULT 1
    )`).run(`CREATE TABLE IF NOT EXISTS CustomerUser(
        ID INTEGER NOT NULL PRIMARY KEY,
        UserId TEXT NOT NULL,
        CustomerId TEXT NULL,
        BranchId TEXT NULL,        
        CreatedBy TEXT NULL,
        CreatedDate TEXT NULL,
        UpdatedBy TEXT NULL,
        UpdatedDate TEXT NULL,
        Active INTEGER DEFAULT 1,
        FOREIGN KEY(UserId) REFERENCES Users(ID)
    )`);
}).parallelize(() => {
    InsertRecord(db.user_db);
});

db.audio_db.serialize(() =>{
    db.audio_db.run(`CREATE TABLE IF NOT EXISTS PlayList(
        Id INTEGER PRIMARY KEY,
        Name TEXT NOT NULL,
        BranchId TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
        CreatedDate TEXT NOT NULL,
        UpdtedBy TEXT NULL,
        UpdatedDate TEXT NULL,
        Active INTEGER DEFAULT 1
    )`);
}).parallelize(()=>{    
});

db.audit_db.serialize(() => {
    db.audit_db.run(`CREATE TABLE IF NOT EXISTS UserAudit(
        Id INTEGER PRIMARY KEY,
        UserAction TEXT NOT NULL,
        UserId TEXT NOT NULL,
        Customer TEXT NULL,
        CustomerId TEXT NULL,
        Branch TEXT NULL,
        BranchId TEXT NULL,
        Date TEXT NOT NULL
        )`).run(`CREATE TABLE IF NOT EXISTS AudioMonitor(
            Id INTEGER PRIMARY KEY,
            Song TEXT NOT NULL,
            PlayOnTime TEXT NOT NULL,
            PlayOffTime TEXT NULL,
            UserId TEXT NOT NULL,
            CustomerId TEXT NOT NULL,
            BranchId TEXT NULL            
        )`).run(`CREATE TABLE IF NOT EXISTS UserMonitor(
            Id INTEGER PRIMAEY KEY,
            User TEXT NOT NULL,
            UserId TEXT NOT NULL,
            LoginTime TEXT NOT NULL,
            LogoutTime TEXT NULL
        )`);
});

db.socket_db.serialize(() => {
    db.socket_db.run(`CREATE TABLE IF NOT EXISTS CurrentUsers(
        Id INTEGER PRIMARY KEY,
        UserId TEXT NOT NULL,
        CustomerId TEXT NULL,
        BranchId TEXT NULL
    )`)
});

function InsertUser(db){
    let query = "SELECT COUNT('') AS Count FROM Users WHERE UserName = ?";
    let param = "james";
    
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
            db.run(insertQuery,[null,"James","james","abc123","user", date],(err) => {
                if(err){
                    console.log(err);
                }                
            });            
        }
    });    
}

function InsertUser1(db){
    let query = "SELECT COUNT('') AS Count FROM Users WHERE UserName = ?";
    let param = "antony";
    
    const insertQuery = `INSERT INTO Users VALUES (?,?,?,?,?,?)`;

    var count = 0;        
    db.each(query,[param],(err, row)=>{
        if(err){
            console.log(err);
        }
        count = row.Count;        
    },function(){
        if(count == 0){
            var date = new Date().toLocaleDateString();           
            db.run(insertQuery,[null,"Antony","antony","abc123","user", date],(err) => {
                if(err){
                    console.log(err);
                }                
            });
        }    
    });
}

function InsertRecord(db){
    let query = "SELECT COUNT('') AS Count FROM Users WHERE UserName = ?";
    let param = "superadmin";
    
    const insertQuery = `INSERT INTO Users VALUES (?,?,?,?,?,?,?,?,?,?)`;

    var count = 0;        
    db.each(query,[param],(err, row)=>{
        if(err){
            console.log(err);
        }
        count = row.Count;        
    },function(){
        if(count == 0){
            var userId = guid.user_guid();
            var date = new Date().toLocaleDateString();    
            var password = crypto.encrypt("admin");
            db.run(insertQuery,[userId,"Super Admin","superadmin",password,"admin",null,date,null,null,1],(err) => {
                if(err){
                    console.log(err);
                }                
            });
        }
    });
}

function FetchRecord(db){
    console.log('fetch record');
    db.each(`Select * from Users`,(err,row)=>{
        console.log(row);
    });
}
