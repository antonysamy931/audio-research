const path = require('path');
const logger = require(path.join(__dirname,"../../routes/helpers/logger"));
const errorlog = logger.getLogger('error');
const mongoose = require("mongoose");

module.exports = {
    connect: function(Url, done){
        const options = {            
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 10,                
            bufferMaxEntries: 0
        };
                
        mongoose.connect(Url, options, function(err){
            if(err){
                errorlog.error(err);
            }
        });
        return done();        
    },   
    close: function(done){
        mongoose.connection.close();       
    }
};