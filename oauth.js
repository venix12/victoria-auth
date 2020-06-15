const config = require('./config.json');
const querystring = require('querystring');
const { default: Axios } = require('axios');

async function getToken(code) {
    try {
        const res = await Axios({
            method: 'post',
            url: 'https://osu.ppy.sh/oauth/token',
            data: querystring.stringify({
                client_id: config.client_id,
                client_secret: config.client_secret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: config.client_redirect,
            }),
        });

        return res.data;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getToken
};