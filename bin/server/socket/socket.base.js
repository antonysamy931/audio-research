var path = require('path');
var auth = require(path.join(__dirname,'socket.auth'));
var customer = require(path.join(__dirname,'socket.customer'));

module.exports = function(io){
    io.on('connection',function(socket){
        console.log(`New user connected ${socket.id}`);
        socket.on('disconnect', function() {
            console.log(`user disconnected ${socket.id}`);
        });
        auth(socket,io);
        customer(socket,io);
    });
}