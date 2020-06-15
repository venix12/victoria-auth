const config = require('./config.json');
const express = require('express');
const oauth = require('./oauth');
const querystring = require('querystring');
const { default: Axios } = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
    req.session.hash = req.query.hash;

    const query = querystring.stringify({
        client_id: config.client_id,
        redirect_uri: config.client_redirect,
        response_type: 'code',
        state: '',
    });

    res.redirect(`https://osu.ppy.sh/oauth/authorize?${query}`);
});

router.get('/callback', async (req, res) => {
    const data = await oauth.getToken(req.query.code);

    if (data.access_token !== null) {
        const webhookData = {
            token: data.access_token,
            hash: req.session.hash
        };

        Axios.post(config.webhook_url,
            {
                content: JSON.stringify(webhookData),
            }
        );

        res.redirect('/success');
    } else {
        res.redirect('/failed');
    }
});

router.get('/failed', (req, res) => {
    res.send('Something went wrong...');
});

router.get('/success', (req, res) => {
    res.send('Authenticated successfully! (you can close this tab now)');
});

module.exports = router;
