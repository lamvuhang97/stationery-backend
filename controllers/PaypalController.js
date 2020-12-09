const paypal = require('@paypal/payouts-sdk');
const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const product = require('../models/product');
class PaypalController {
    async payout(req, res) {
// Creating an environment
let clientId = "AZhIu0RkhaIzYZoeEo9WRDb77RwIAdKJ2xU-asSooHjntci8urKtzXyE_XxcZDUfT3bgnubNGgAOpAlb";
let clientSecret = "EOm0yCz73TS7LVpXYCTMaH0MkcZDuuU6yEdmvcj99pgzEwbIlmUInbU7bE_JY9EadFv4uheX16qVHz11";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

let requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": "asaospdu0fsefefjujghnwfasdaxkj",
      "email_subject": "This is a test transaction from SDK"
    },
    "items": [{
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "12.00"
      },
      "receiver": "sb-ztm5c3958753@personal.example.com",
      "sender_item_id": "asldksksuxawdwe324r4wdfsawdewrdasdsdydowishdih"
    }]
  }

// Construct a request object and set desired parameters
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
let createPayouts  = async function(){
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
       console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
}
createPayouts();
return res.status(200).json("data")
    }
}
module.exports = new PaypalController()