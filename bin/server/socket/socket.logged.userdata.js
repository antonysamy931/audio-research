const path = require('path');
const jwt = require('jsonwebtoken');
const config = require(path.join(__dirname, '../routes/constant/config'));

var Users = [];

module.exports = {
    ConnectedUser: function(data){        
        console.log(config.My_Secret_Key);
        console.log(data);
        var User = GetUserData(data);
        if(data){
            if(UserAlreadyExist(data) > -1){
                Users.push(data);
            }
        }
    },

    DisconnectedUser: function(data){
        let index = UserAlreadyExist(data);
        if(index > -1){
            Users.splice(index,1);
        }
    },

    GetAvailableCustomers: function(){
        let Customers = [];
        for(var i = 0; i < Users.length; i++){
            if(Customers.indexOf(Users[i].CustomerId)){
                Customers.push(Users[i].CustomerId);
            }
        }
        return Customers;
    },

    GetAvailableBranchs: function(CustomerId){
        let Branches = [];
        for(var i =0; i < Users.length; i++){
            if(Users[i].CustomerId == CustomerId 
            && Branches.indexOf(Users[i].BranchId)){
                Branches.push(Users[i].BranchId);
            }
        }
    }
};

function GetUserData(data){
     return jwt.verify(data, config.My_Secret_Key); 
}

function UserAlreadyExist(user){
    if(Users.length > 0){
        for(var i = 0; i < Users.length; i++){
            if(Users[i].UserId == user.UserId){
                return i;
            }
        }
    }else{
        return -1;
    }    
}