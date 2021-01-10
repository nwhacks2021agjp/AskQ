const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const admin = require('firebase-admin')
const serviceAccount = require('./ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/attend', function (req, res) {
    res.sendFile(__dirname + '/views/layoutattender.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.join('roomCode')

    // socket.on('setRoomCode', (data) => {
    //     const destination = "/attend";
    //     console.log('User Entered Room Code:' + data);
    //     socket.join('roomCode');
    //     socket.emit('redirect', destination);
    // })

    socket.on('chat message', (data) => {
        console.log('user message:' + data);
        // var data = JSON.parse(data)
        // db.collection('messages')
        io.to('roomCode').emit('store message', data);
    })

})

http.listen(5000, "0.0.0.0" ,function() {
    console.log("on port *:5000")
})