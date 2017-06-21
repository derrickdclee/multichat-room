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
  console.log('New user connected');

  // emits to this socket only
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log(message);

    // emits to every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // sends event to every socket but this
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   test: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
