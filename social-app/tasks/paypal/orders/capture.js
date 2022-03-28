const paypal = require('@paypal/checkout-server-sdk');

require('dotenv').config();

let client = require('./client');

const captureOrder = async (authorizationId) => {
  request = new paypal.payments.AuthorizationsCaptureRequest(authorizationId);
  request.requestBody({});

  // Call API with your client and get a response for your call
  let response = await client.execute(request);

  console.log(`Capture: ${JSON.stringify(response.result)}`);
  console.log(response);
}

captureOrder('0GR56171K0782810S');