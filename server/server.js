const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// this is how you serve static files
app.use(express.static(publicPath));

// lets you listen for an event
io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.emit('newMessage', {
    from: 'Derrick Lee',
    text: 'Hello this is a text email',
    createdAt: 123
  });

  socket.on('createMessage', (data) => {
    console.log(data);
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
