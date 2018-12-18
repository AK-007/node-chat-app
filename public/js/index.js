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
socket.on('newLocationMessage',function(obj){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>')
    li.text(`${obj.from}:`);
    a.attr('href',obj.url);
    li.append(a);
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
jQuery('#send-location').on('click',function(e){
    if(!navigator.geolocation)return alert('Geolocation not supported by browser');
    navigator.geolocation.getCurrentPosition(function(pos){
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function(){
        alert('Could not fetch');
    });
});
