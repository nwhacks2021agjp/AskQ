const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('New user connected')
    // socket.username = "Anon"
    // socket.on('change_username', (data) => {
    //     socket.username = data.username
    // })
});

http.listen(8888, () => {
    console.log('listening on *:8888')
})