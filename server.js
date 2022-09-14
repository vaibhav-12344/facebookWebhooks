const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const FACEBOOK_PAGE_ACCESS_TOKEN = 'EAAQQW60hXm8BAPykLZCVJ28teflVaudpzZCrXlcpfrmU2zd4iFc7g9ypL5bnffbQbReZBUw1nOkpG9hn7ZB1AcCfGAKtRR6HQLxyYfPOFFDij3o5KccJyKugycvweuhkSbwaENYJZBNKmmANiZAisRiXBV0OYBSZCTv7wfYhn7dNxxPyq4D01CRGn575jOwcIsZD';
app.use(bodyParser.json());
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'vaibhav123') {
        res.send(req.query['hub.challenge']);
        return;
    }
})
app.post('/webhook', async (req, res) => {
    if (!req.body.entry) {
        return res.status(500).send({ error: 'Invalid POST data received' });
    }
    for (const entry of req.body.entry) {
        for (const change of entry.changes) {
            await processNewLead(change.value.leadgen_id);
        }
    }
    res.send({ success: true });
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
async function processNewLead(leadId) {
    let response;
    try {
        response = await axios.get(`https://graph.facebook.com/v14.0/${leadId}/?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`);
    }
    catch (err) {
        return console.warn(`An invalid response was received from the Facebook API:`, err.response.data ? JSON.stringify(err.response.data) : err.response);
    }
    if (!response.data || (response.data && (response.data.error || !response.data.field_data))) {
        return console.warn(`An invalid response was received from the Facebook API: ${response}`);
    }
    const leadForm = [];
    for (const field of response.data.field_data) {
    
        const fieldName = field.name;
        const fieldValue = field.values[0];
    
        leadForm.push(`${fieldName}: ${fieldValue}`);
    }
    const leadInfo = leadForm.join('\n');
    console.log('A new lead was received!\n', leadInfo);
}