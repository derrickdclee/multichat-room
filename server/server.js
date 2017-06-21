const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// this is how you serve static files
app.use(express.static(publicPath));

// lets you listen for an event
io.on('connection', (socket) => {
  console.log('New user connected');

  // emits to this socket only
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    // emits to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This message is coming from the server');

    // sends event to every socket but this
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   test: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
