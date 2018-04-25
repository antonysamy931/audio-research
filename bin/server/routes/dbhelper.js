const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const databasePath = path.join(__dirname ,"../db/Audio_Player.db");

const userrepo = require(path.join(__dirname,'userrepo'));
const playrepo = require(path.join(__dirname,'playfilerepo'));

var User = {
    Name : "",
    UserName : "",
    Password : "",
    Role : "User"
}

var PlayFile = {
    Name : "",
    UserId : ""    
}

function UsersByUserRole(){
    let db = new sqlite.Database(databasePath, (err) => {
                if(err){
                    console.log(err);
                }    
            });
    return userrepo.GetUsersByRole("user", db);
}

function GetFilesByUser(Id){
    let db = new sqlite.Database(databasePath, (err) => {
                if(err){
                    console.log(err);
                }    
            });
    return playrepo.GetFilesByUser(Id, db);
}

function AuthenticateUser(UserName, Password){
    let db = new sqlite.Database(databasePath, (err) => {
                if(err){
                    console.log(err);
                }    
            });
    return userrepo.GetUserByUserNameAndPassword(UserName, Password, db);
}

module.exports = {
    UsersByUserRole : UsersByUserRole,
    GetFilesByUser : GetFilesByUser,
    AuthenticateUser : AuthenticateUser
};