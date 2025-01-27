const { app } = require('@azure/functions');
const rapidEndpoint = "https://api.sandbox.ewaypayments.com/AccessCodesShared";
const apiKey = "C3AB9ATDmEkBXOCFsXK81q+RG1X35oXI2z87aTJbaSWgJ5A9+OpX69eOLAquri7Gmqzwts";
const password = "mJeH9HVn";

app.http('geteWayPaymentURL', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        fetch('https://api.ewaypayments.com/AccessCodesShared', {
            method: 'POST',
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
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                return { body: data };
            });
        }).catch(err => {
            console.log(err);
            return { body: err };
        });

        return { body: `Hello, ${name}!` };
    }
});
