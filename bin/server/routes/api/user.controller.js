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

router.get('/getuserbyid',function(req,res,next){    
    dbhelper.userrepo.GetUserById(req.query.UserId).then(function(result){
        res.json(result);
    });
});

router.post('/updateuser',function(req,res,next){
    dbhelper.userrepo.UpdateUser(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/isuserexistforcustomer',function(req,res,next){
    dbhelper.userrepo.IsUserExistForCustomer(req.body.CustomerId,req.body.UserName).then(function(result){
        res.json(result);
    });
});

module.exports = router;