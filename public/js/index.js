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

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault(); // prevents page refresh

  var messageTextbox = $("input[name='message']");
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
      messageTextbox.val('');
  });
});

////////////////////////////////////////////////////
var locationBtn = $('#send-location');
locationBtn.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) { // success case
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, function() { // failure case
    locationBtn.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
