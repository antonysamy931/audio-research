const express = require('express');
const router = express.Router();

/* Api gets work */
router.get('/',function(req,res){
    res.json('api working fine');
});

router.post('/upload',function(req,res){
    console.log(req);
    res.json('success');
});

module.exports = router;