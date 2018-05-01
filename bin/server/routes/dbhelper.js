const express = require('express');
const path = require('path');

const userrepo = require(path.join(__dirname,'./repo/user.repo'));
const playrepo = require(path.join(__dirname,'./repo/playfile.repo'));
const addressrepo = require(path.join(__dirname,'./repo/address.repo'));
const auditrepo = require(path.join(__dirname,'./repo/audit.repo'));
const authenticaterepo = require(path.join(__dirname,'./repo/authenticate.repo'));
const branchrepo = require(path.join(__dirname,'./repo/branch.repo'));
const customerrepo = require(path.join(__dirname,'./repo/customer.repo'));
const customeruserrepo = require(path.join(__dirname,'./repo/customer.user.repo'));

module.exports = {
    userrepo,
    playrepo,
    addressrepo,
    auditrepo,
    authenticaterepo,
    branchrepo,
    customerrepo,
    customeruserrepo
}

/*var User = {
    Name : "",
    UserName : "",
    Password : "",
    Role : ""
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

function FileInfoInsert(Id, Name){
    let db = new sqlite.Database(databasePath, (err) => {
        if(err){
            console.log(err);
        }    
    });
    PlayFile = {
        Name : Name,
        UserId: Id
    };
    playrepo.Insert(PlayFile, db);
}

module.exports = {
    UsersByUserRole : UsersByUserRole,
    GetFilesByUser : GetFilesByUser,
    AuthenticateUser : AuthenticateUser,
    FileInfoInsert : FileInfoInsert
};*/