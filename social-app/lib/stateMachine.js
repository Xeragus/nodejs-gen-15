const { createMachine } = require('xstate');

const stateMachine = createMachine({
  id: 'machine',
  initial: 'initilazing',
  context: {
    count: 0,
  },
  states: {
    initilazing: {
      on: { PAYMENT_AUTHORIZED: 'authorized' },
    },
    authorized: {
      on: { PAYMENT_RECIEVED: 'captured', PAYMENT_DENIED: 'voided' },
    },
    captured: {
      on: { PAYMENT_REFUNDED: 'refunded' },
    },
    voided: {
      on: {},
    },
    refunded: {
      on: {},
    },
  },
});

module.exports = stateMachine;
