// src/functions/oauthCallback.js
import { app } from '@azure/functions';
import axios from 'axios';

const CLIENT_ID = process.env.ACC_CLIENT_ID;
const CLIENT_SECRET = process.env.ACC_CLIENT_SECRET;
const REDIRECT_URI = process.env.ACC_REDIRECT_URI;

app.http('oauthCallback', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const code = request.query.get('code');
    if (!code) {
      return { status: 400, body: 'Missing authorization code' };
    }

    try {
      const tokenResponse = await axios.post(
        'https://developer.api.autodesk.com/authentication/v2/gettoken',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const tokenData = tokenResponse.data;

      // 🚨 For demo purposes only. Don't return access tokens in production.
      return {
        status: 200,
        body: {
          message: 'Authentication successful',
          tokenData
        }
      };
    } catch (error) {
      context.log.error('Token exchange failed:', error.response?.data || error.message);
      return {
        status: 500,
        body: 'Token exchange failed. Check server logs.'
      };
    }
  }
});
