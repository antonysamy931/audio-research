var path = require('path');
var Users = require(path.join(__dirname,'socket.logged.userdata'));

module.exports = function(socket, io){
    socket.on('login', (data) => {
        Users.ConnectedUser(data);                
    });

    socket.on('logout', (data) => {
        Users.DisconnectedUser(data);
    });
}