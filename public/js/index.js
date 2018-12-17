var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});
socket.on('disconnect',function(){
    console.log('server down');
});
socket.on('newMessage',function(message){
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'You',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});
