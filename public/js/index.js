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

  ("input[name='message']").val('');
});
