const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const inly = require('inly');

const fileDir = './bin/Files/';
const zipDir = './bin/Files/Zip/';

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

router.post('/getcustomermappedbranches',function(req,res){
    dbhelper.customergrouprepo.GetCustomerMappedBranches(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/getgroupmappedbranches',function(req,res){    
    dbhelper.customergrouprepo.GetGroupMappedBranches(req.body).then(function(result){
        res.json(result);
    });
});

router.post('/groupfileupload',function(req,res){
    if (!req.files)
        return res.status(400).json('No files were uploaded.');

    if(req.files)
    {     
        if(!fs.existsSync(fileDir)){
            fs.mkdirSync(fileDir);
        }

        let Id = req.query.Id;
        let Name = req.files.audio.name;
        if(['.mp3','.mp4'].indexOf(path.extname(Name)) > -1){                    
            let audioFile = req.files.audio;
            audioFile.mv(fileDir + req.files.audio.name, function(err){
                if (err)
                    return res.status(500).json(err);
                else{
                    dbhelper.customergrouprepo.MapAudioToGroupBranches(Id, Name, req.body.CreatedBy).then(function(result){
                        res.json('File uploaded');
                    });
                }                    
            });
        }else if([".zip",".gz",".bz2",".tar","tar.gz","tar.bz2",".tgz",".tbz2"].indexOf(path.extname(Name)) > -1){
            if(!fs.existsSync(zipDir)){
                fs.mkdirSync(zipDir);
            }
            let audioFile = req.files.audio;
            audioFile.mv(zipDir + req.files.audio.name, function(err){
                if (err)
                    return res.status(500).json(err);
                else{
                    const extract = inly(zipDir + req.files.audio.name,fileDir);
                    extract.on('file', (name) => {
               
                        dbhelper.customergrouprepo.MapAudioToGroupBranches(Id, name, req.body.CreatedBy).then(function(result){

                        })                        
                    });                    
                    extract.on('end',() => {                        
                        fs.unlink(zipDir+req.files.audio.name,function(err){
                            if(err){
                                console.log(err);
                            }
                            res.json('File uploaded');
                        });                        
                    });
                }
            });
        }
    }
});

module.exports = router;