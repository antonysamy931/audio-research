const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'dbhelper'));

router.get('/authenticate',function(req,res){
    let UserName = req.query.UserName;
    let Password = req.query.Password;    
    dbhelper.AuthenticateUser(UserName,Password).then(function(result){
        res.json(result);
    });    
})

module.exports = router;