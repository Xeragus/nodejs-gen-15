const paypal = require('@paypal/checkout-server-sdk');

let client = require('./client');

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
let request = new paypal.orders.OrdersCreateRequest();
request.headers["prefer"] = "return=representation";
request.requestBody({
    "intent": "AUTHORIZE",
    "purchase_units": [
        {
            "amount": {
                "currency_code": "USD",
                "value": "100.00"
            }
        }
     ]
});

// Call API with your client and get a response for your call
let createOrder = async function() {
    let response = await client.execute(request);

    console.log(`Create: ${JSON.stringify(response.result)}`);
    console.log(response);
}

createOrder();
