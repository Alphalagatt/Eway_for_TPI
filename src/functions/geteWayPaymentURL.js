const { app } = require('@azure/functions');
const rapidEndpoint = "https://api.sandbox.ewaypayments.com/AccessCodesShared";
const apiKey = "C3AB9ATDmEkBXOCFsXK81q+RG1X35oXI2z87aTJbaSWgJ5A9+OpX69eOLAquri7Gmqzwts";
const password = "mJeH9HVn";

app.http('geteWayPaymentURL', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
/*
        try {
            //const name = request.query.get('name') || await request.text() || 'world';
            const response = await fetch('https://api.ewaypayments.com/AccessCodesShared', {
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
            });
            

            const data = await response.json();
            console.log(JSON.stringify(data));
            $return = {
                status: 200,
                body: JSON.stringify(data)
            };
            //return JSON.stringify(data);

        } catch (err) { 
            $return = {
                status: 500,
                body: err  
            };
            //return { body: err };
        };

        return {
            status: 200,
            body: "Hello World"
        };
*/
        context.res = {
            status: 200,
            body: "Hello World for context res"
        };

    }
});
