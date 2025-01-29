const { app } = require('@azure/functions');
const scriptjs = require('scriptjs');
const rapidEndpoint = "https://api.sandbox.ewaypayments.com/AccessCodesShared";
const apiKey = process.env.EWAY_API_KEY;
const password = process.env.EWAY_PASSWORD;



app.http('geteWayPaymentURL', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        scriptjs('https://secure.ewaypayments.com/scripts/eCrypt.js', async function () {
            try {
                //const name = request.query.get('name') || await request.text() || 'world';
                const response = await fetch('https://api.ewaypayments.com/AccessCodesShared', {
                    method: 'POST',
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Buffer.from(apiKey + ':' + password).toString('base64'),
                    },
                    body: JSON.stringify({
                        "Payment": {
                            "TotalAmount": 100
                        },
                        "RedirectUrl": "http://www.eway.com.au",
                        "CancelUrl": "http://www.eway.com.au",
                        "TransactionType": "Purchase"
                    })
                });


                const data = await response.json();
                context.log(JSON.stringify(data));

                var eWAYConfig = {
                    sharedPaymentUrl: data.SharedPaymentUrl,
                };

                console.log(eWAYConfig.sharedPaymentUrl);

                function resultCallback(result, transactionID, errors) {
                    if (result == "Complete") {
                        alert("Payment complete! eWAY Transaction ID: " + transactionID);
                    } else if (result == "Error") {
                        alert("There was a problem completing the payment: " + errors);
                    }
                }
                eCrypt.showModalPayment(eWAYConfig, resultCallback);

                return {
                    status: 200,
                    body: JSON.stringify(data)
                };

            } catch (err) {
                return {
                    status: 500,
                    body: err
                };
            };
        });


    }
});
