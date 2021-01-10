$(function () {
    var socket = io.connect('http://localhost:5000');

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var messages = $("#messages");

    send_message.on("click", function () {
        console.log('here!!!')
        socket.emit('new_message', {username: username.val(), msg: message.val()});
    });

    socket.on("new_message", (data) => {
        console.log(data)
        // messages.append("<li><p class='message'>" + data['username'] + ':' + data['msg'] + "</li></p class='message'>")
    })
})