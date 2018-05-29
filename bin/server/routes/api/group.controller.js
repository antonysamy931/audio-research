const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'../dbhelper'));

router.get('/getgroups',function(req,res){
    dbhelper.customergrouprepo.GetGroups(req.query.CustomerId).then(function(result){
        res.json(result);
    });
});

router.post('/insertgroup',function(req,res){
    dbhelper.customergrouprepo.Insert(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/deletegroup',function(req,res){
    dbhelper.customergrouprepo.Delete(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/deletebranchforgroup',function(req,res){
    dbhelper.customergrouprepo.DeleteBranch(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/groupnameexit',function(req,res){
    dbhelper.customergrouprepo.GroupNameExit(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/groupnameexistupdate',function(req,res){
    dbhelper.customergrouprepo.GroupNameExistUpdate(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/addbranchtogroup',function(req,res){
    dbhelper.customergrouprepo.AddBranchToGroup(req.body).then(function(result){
        res.json(result);
    });
});

module.exports = router;