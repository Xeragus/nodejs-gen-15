const paypal = require('@paypal/checkout-server-sdk');

let client = require('./client');

// Call API with your client and get a response for your call
let authorize = async function(orderId) {
    const request = new paypal.orders.OrdersAuthorizeRequest(orderId);
    request.requestBody({});

    let response = await client.execute(request);
    
    console.log(`Authorize: ${JSON.stringify(response.result)}`);
    console.log(response);
}

authorize('2PM32242NN4640214');
