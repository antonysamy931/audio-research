const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'../dbhelper'));

router.get('/getcustomersusers',function(req,res){
    dbhelper.userrepo.GetCustomersUsers().then(function(result){
        res.json(result);
    });
});

router.post('/addnewuser',function(req,res,next){
    dbhelper.userrepo.Insert(req.body).then(function(result){
        res.json('User inserted successfully');
    })
});

router.get('/getbranchusers',function(req,res,next){
    dbhelper.userrepo.GetBranchUsers(req.query.BranchId).then(function(result){
        res.json(result);
    })
});

module.exports = router;