const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const fileDir = './bin/Files/';
const dbhelper = require(path.join(__dirname,'../dbhelper'));

/* Api gets work */
router.get('/',function(req, res, next){
    res.json('api working fine');
});

router.post('/upload',function(req, res, next){
    if (!req.files)
        return res.status(400).json('No files were uploaded.');

    if(req.files)
    {     
        if(!fs.existsSync(fileDir)){
            fs.mkdirSync(fileDir);
        }

        let Id = req.query.Id;
        let Name = req.files.audio.name;
        var record = {
            Name: Name,
            BranchId: Id,
            CreatedBy: req.CreatedBy
        }
        dbhelper.playrepo.Insert(record).then(function(result){
            let audioFile = req.files.audio;
            audioFile.mv(fileDir + req.files.audio.name, function(err){
                if (err)
                    return res.status(500).json(err);
                
                res.json('File uploaded');
            });
        });        
    }
});

router.get('/getfilebybranch',function(req,res,next){
    dbhelper.playrepo.GetFileByBranch(req.query,BranchId).then(function(result){
        if(!result){
            res.status(404).json('File not found');
        }else{
            res.send(fs.readFileSync(fileDir+result.Name));
        }
    });
});

router.get('/getfiles',function(req, res, next){
    var audioFiles = fs.readdirSync(fileDir);    
    res.json(audioFiles);
});

router.get('/getfile',function(req, res, next){
    res.send(fs.readFileSync(fileDir+req.query.name));
});

router.get('/getfilesbyuser',function(req,res){
    let UserId = req.query.Id;
    dbhelper.GetFilesByUser(UserId).then(function(result){
        res.json(result);
    });
});

module.exports = router;