const { app } = require('@azure/functions');
var rapid = require('eway-rapid');
const rapidEndpoint = "Production";
const apiKey = process.env.EWAY_API_KEY;
const password = process.env.EWAY_PASSWORD;


//for in app purchases in dynamics 365 sales
app.http('geteWayPaymentURL', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);


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

    }
});
//for secure panel payment in power pages..
app.http('processpayment', {
    methods: ['POST'],
    authLevel: 'anonymous',
    body: {
        type: 'json'
    },
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);


        try {
            var client = rapid.createClient(apiKey, password, rapidEndpoint);
            
            const response = await client.createTransaction(rapid.PaymentMethod.Direct, {
                Customer: {
                    FirstName: "John",
                    LastName: "Smith",
                    Email: "",
                    Phone: "09 889 0986"
                },
                ShippingAddress: {
                    Street1: "Level 5",
                    Street2: "369 Queen Street",
                    City: "Auckland",
                    State: "",
                    PostalCode: "1010",
                    Country: "NZ"
                },
                Items: [
                    {
                        SKU: "12345678901234567890",
                        Description: "Item Description 1",
                        Quantity: 1,
                        UnitCost: 400,
                        Tax: 100
                    }
                ],  
                Payment: {
                    TotalAmount: 500
                }
            });

            context.log(JSON.stringify(response));
            return {
                status: 200,
                body: JSON.stringify(response)
            };
            

        } catch (err) {
            return {
                status: 500,
                body: err
            };
        };

    }
});
