var path = require('path');
var Users = require(path.join(__dirname,'socket.logged.userdata'));

module.exports = function(socket, io){
    socket.on('Customers',(data) => {
        Users.GetAvailableCustomers().then(function(result){
            io.sockets.emit('GetCustomers',result);
        });        
    });
}