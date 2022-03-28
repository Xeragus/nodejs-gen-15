const paypal = require('@paypal/checkout-server-sdk');

require('dotenv').config();

// Creating an environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

module.exports = new paypal.core.PayPalHttpClient(environment);