var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
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

/*
* for using a location button
*/
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
