const express = require('express');
const router = express.Router();

const path = require('path');
const jwt = require('jsonwebtoken');

const config = require(path.join(__dirname, '../constant/config'));

router.use(function(req, res, next){   
    if(req.path.includes('api/v1') && !req.path.includes('login') && !req.path.includes('api/v1/play/getfile')){
        let authorization = req.header('Authorization');
        if(!authorization){
            res.status(401).json('UnAuthorized User.');
        }else{
            let token = authorization.split(' ')[1];          
            var data = jwt.verify(token, config.My_Secret_Key); 
            req.body.AuthorizeData = data;
            req.body.CreatedBy = req.body.AuthorizeData.UserId;
            req.body.UpdatedBy = req.body.AuthorizeData.UserId;
            next();
        }
    }else{
        next();
    }
});

module.exports = router;
