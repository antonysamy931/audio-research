const express = require('express');
const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./bin/server/db/Audio_Player.db', sqlite.OPEN_READWRITE, (err) => {
    if(err){
        console.log(err);
    }
    console.log('SQLite database connected');    
});

db.close((err) => {
    if(err){
        console.log(err);
    }
    console.log('SQLite database closed');
});