const events = require('events');
const emitter = new events.EventEmitter();

// listener
emitter.on('event_x', obj => {
  console.log('event with the name of event_x happened', obj);
});

// event emit
emitter.emit('event_x', { a: 1, b: 'hehehe' });
