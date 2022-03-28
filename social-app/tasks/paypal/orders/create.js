var paypal = require('paypal-rest-sdk');

require('dotenv').config();

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

var create_payment_json = {
  "intent": "order",
  "payer": {
      "payment_method": "paypal"
  },
  "redirect_urls": {
      "return_url": "http://return.url",
      "cancel_url": "http://cancel.url"
  },
  "transactions": [{
      "item_list": {
          "items": [{
              "name": "item",
              "sku": "item",
              "price": "1.00",
              "currency": "USD",
              "quantity": 1
          }]
      },
      "amount": {
          "currency": "USD",
          "total": "1.00"
      },
      "description": "This is the payment description."
  }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      console.log("Create Payment Response");
      console.log(payment);
  }
});