var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  var li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  $('#messages').append(li);
});


$('#message-form').on('submit', function(e) {
  e.preventDefault(); // prevents page refresh

  socket.emit('createMessage', {
    from: 'User',
    text: $("input[name='message']").val()
  }, function(){
  });

<<<<<<< HEAD
  $("input[name='message']").val('');
=======
  ("input[name='message']").val('');
>>>>>>> 0a75dc33d244e3a888cb8b04852e4d40518e4524
});
