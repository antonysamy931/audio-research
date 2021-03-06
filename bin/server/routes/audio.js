const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const fileDir = './bin/Files/';
const dbhelper = require(path.join(__dirname,'dbhelper'));

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
        console.log(Id);
        let Name = req.files.audio.name;
        dbhelper.FileInfoInsert(Id, Name);

        let audioFile = req.files.audio;
        audioFile.mv(fileDir + req.files.audio.name, function(err){
            if (err)
                return res.status(500).json(err);
            
            res.json('File uploaded');
        });
    }
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