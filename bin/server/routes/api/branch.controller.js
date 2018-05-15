const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'../dbhelper'));

router.post('/create', function(req,res,next){        
    dbhelper.branchrepo.Insert(req.body).then(function(result){
        res.status(201).json('Branch created successfully');
    });
});

router.get('/getallbranches',function(req,res,next){
    dbhelper.branchrepo.GetAllBranches().then(function(result){
        res.status(201).json(result);
    });
});

router.get('/getcustomerbranches',function(req,res,next){
    var customerId = req.query.CustomerId;
    dbhelper.branchrepo.GetCustomerBranches(customerId).then(function(result){
        res.status(201).json(result);
    });
});

router.get('/getbranchbyid',function(req,res,next){
    var branchId = req.query.BranchId;
    dbhelper.branchrepo.BranchGetById(branchId).then(function(result){
        res.status(201).json(result);
    });
});

router.post('/updatebranch', function(req,res,next){    
    dbhelper.branchrepo.Update(req.body).then(function(result){                
        res.status(201).json(result);
    });
});

router.post('/deletebranch', function(req,res,next){    
    dbhelper.branchrepo.Delete(req.body).then(function(result){                
        res.status(201).json(result);
    });
});

router.post('/isbranchexist',function(req,res,next){
    dbhelper.branchrepo.IsBranchExist(req.body.Name,req.body.CustomerId).then(function(result){
        res.json(result);
    });
});

module.exports = router;