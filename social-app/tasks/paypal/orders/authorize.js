var paypal = require('paypal-rest-sdk');

require('dotenv').config();

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

var orderId = "PAYID-MJBAKZA6BW97611VG924611W";

var authorize_details = {
    "amount": {
        "currency": "USD",
        "total": "0.80"
    }
};

paypal.order.authorize(orderId, authorize_details, function (error, authorization) {
    if (error) {
        console.log(error.response);
        console.error(error);
    } else {
        console.log(authorization);
    }
});