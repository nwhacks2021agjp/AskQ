const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.join('roomCode') //replace later with socket on method?

    socket.on('chat message', (data) => {
        console.log('user message:' + data);
        io.to('roomCode').emit('store message', data);
    })

})

http.listen(5000, function() {
    console.log("on port *:5000")
})