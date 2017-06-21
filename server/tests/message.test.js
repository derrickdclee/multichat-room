var expect = require('expect');
var {generateMessage} = require('./../utils/message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var msg = generateMessage('Derrick', 'Hello');

    expect(msg.from).toBe('Derrick');
    expect(msg.text).toBe('Hello');
    expect(msg.createdAt).toBeA('number');
  });
});
