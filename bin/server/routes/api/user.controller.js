const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'../dbhelper'));

router.get('/getcustomersusers',function(req,res){
    dbhelper.userrepo.GetCustomersUsers().then(function(result){
        res.json(result);
    });
});

module.exports = router;