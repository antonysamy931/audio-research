const express = require('express');
const router = express.Router();
const path = require('path');

const dbhelper = require(path.join(__dirname,'../dbhelper'));

router.post('/create', function(req,res,next){        
    dbhelper.customerrepo.Insert(req.body).then(function(result){
        res.status(201).json('Customer created successfully');
    });
});

router.get('/getallcustomers',function(req,res,next){
    dbhelper.customerrepo.GetAllCustomers().then(function(result){        
        res.status(201).json(result);
    });
});

router.get('/getcustomer',function(req,res,next){
    var customerId = req.query.CustomerId;    
    dbhelper.customerrepo.CustomerGetById(customerId).then(function(result){                
        res.status(201).json(result);
    });
});

router.post('/updatecustomer', function(req,res,next){    
    dbhelper.customerrepo.Update(req.body).then(function(result){                
        res.status(201).json(result);
    });
});

router.post('/deletecustomer', function(req,res,next){    
    dbhelper.customerrepo.Delete(req.body).then(function(result){                
        res.status(201).json(result);
    });
});

module.exports = router;