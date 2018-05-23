module.exports = function(socket, io){
    socket.on('branchjoin', (data) => {
        socket.join(data);        
    });

    socket.on('branchleave', (data) => {
        socket.leave(data);        
    });

    socket.on('songinfo',function(data){
        console.log(data);
        io.to(data.branchid).emit('receiveaudio',data.audio);
    });
}