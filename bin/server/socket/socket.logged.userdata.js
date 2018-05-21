const path = require('path');
const jwt = require('jsonwebtoken');
const config = require(path.join(__dirname, '../routes/constant/config'));
const dbhelper = require(path.join(__dirname, '../routes/dbhelper.js'));

module.exports = {
    ConnectedUser: function(data){        
        var User = GetUserData(data);      
        dbhelper.socketrepo.UserExist(User.UserId).then(function(result){
            if(result == undefined){
                dbhelper.socketrepo.Insert(User);
            }
        });  
    },

    DisconnectedUser: function(data){        
        var User = GetUserData(data);           
        dbhelper.socketrepo.Delete(User.UserId);
    },

    GetAvailableCustomers: function(){        
        return dbhelper.socketrepo.GetCustomers();
    },

    GetAvailableBranchs: function(CustomerId){
        return dbhelper.socketrepo.GetCustomerBranches(CustomerId);
    }
};

function GetUserData(data){
     return jwt.verify(data, config.My_Secret_Key); 
}