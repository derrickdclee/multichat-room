var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./../utils/message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var msg = generateMessage('Derrick', 'Hello');

    expect(msg.from).toBe('Derrick');
    expect(msg.text).toBe('Hello');
    expect(msg.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Chloe';
    var lat = 15;
    var lng = 19;
    var url = 'https://www.google.com/maps?q=15,19';

    var msg = generateLocationMessage(from, lat, lng);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, url});
  });
})
