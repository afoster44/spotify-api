const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(cors())
app.use(bodyParser.json())

const CLIENT_ID = '83cd894c8d2646bab7384165d5be00ba'
const CLIENT_SECRET = 'f6b55880f6df440ca23c54196b3be157'
const REDIRECT_URI = 'http://localhost:8080/Dashboard'

app.post('/login', async (req, res) => {
    console.log('logging the request', req.body)
    const authCodeProof = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: req.body.code
    }
    try {
        console.log('got here', querystring.stringify(authCodeProof))
        const responseBody = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify(authCodeProof));
        console.log('token response', responseBody.data)
        res.json({
            accessToken : responseBody.data.access_token,
            refreshToken : responseBody.data.refresh_token,
            expiresIn : responseBody.data.expires_in
        })
    } catch (e) {
        console.error(e);
    }
})

app.post('/refresh', async (req, res) => {
    console.log('refresh')
    const authCodeProof = {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        refresh_token: req.body.refreshToken
    }
    try {
        const responseBody = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(authCodeProof))
        console.log(responseBody.data)
        res.send('successful trade of refresh token for access token')
    } catch (e) {
        console.log(e)
    }
})

app.listen(3001, () => console.log('listening on port 3001'))