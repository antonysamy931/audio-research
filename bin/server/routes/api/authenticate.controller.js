const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

const dbhelper = require(path.join(__dirname,'../dbhelper'));
const cryptosystem = require(path.join(__dirname, '../helpers/cryptosystem'));
const config = require(path.join(__dirname, '../constant/config'));

router.post('/login',function(req,res){    
    let UserName = req.body.UserName;
    let Password = cryptosystem.encrypt(req.body.Password);
     
    dbhelper.authenticaterepo.Login(UserName,Password).then(function(result){
        if(typeof(result) == 'undefined' || result == null || result == ''){
            res.status(401).json('Username or password provide incorrect');
        }else{
            var token = jwt.sign(JSON.stringify(result),config.My_Secret_Key);
            var data = {
                Token : token,
                Result : result
            }

            data.Result.IsSuperAdmin = false;
            data.Result.IsSuperMember = false;
            data.Result.IsCustomerUser = false;
            data.Result.IsCustomerAdmin = false;
            data.Result.IsCustomerMember = false;
            
            if(typeof(result.CustomerId) == 'undefined' || result.CustomerId == null){
                if(result.UserRole == 'admin'){
                    data.Result.IsSuperAdmin = true;
                } else if(result.UserRole == 'member'){
                    data.Result.IsSuperMember = true;
                }
            }
            else if(result.CustomerId){
                data.Result.IsCustomerUser = true;
                if(result.UserRole == 'admin'){
                    data.Result.IsCustomerAdmin = true;
                } else if(result.UserRole == 'member'){
                    data.Result.IsCustomerMember = true;
                }
            }
            res.status(201).json(data);
        }
    });    
});

router.post('/logout',function(req, res){           
    var Result = {
        token: null,
        message: "User logged out successfully"
    } 
    res.status(201).json(Result);
});

module.exports = router;