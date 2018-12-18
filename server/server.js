const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var {generateMessage,generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('New user connected');

    socket.on('disconnect', function(){
        console.log('client down');
    });
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    socket.on('createMessage',(message,callback) => {
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server');
    });
    socket.on('createLocationMessage',(coords) => {
         io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
});
server.listen(port,() => {
    console.log(`Server on ${port}`);
})
