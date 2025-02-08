import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import fetch from 'node-fetch';

const DISCOSG_API_BASE = 'https://api.discogs.com';

export const getOAuthClient = () => {
  const oauth = new OAuth({
    consumer: {
      key: process.env.DISCOGS_CONSUMER_KEY as string, // Add this to .env.local
      secret: process.env.DISCOGS_CONSUMER_SECRET as string, // Add this to .env.local
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  });

  return oauth;
};

export const getRequestToken = async () => {
  const oauth = getOAuthClient();

  const requestData = {
    url: 'https://api.discogs.com/oauth/request_token',
    method: 'POST',
    data: {
      oauth_callback: 'oob', // Or specify your callback URL
    },
  };

  const token = oauth.authorize(requestData);

  const res = await fetch(requestData.url, {
    method: requestData.method,
    headers: oauth.toHeader(token),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch request token: ${res.statusText}`);
  }

  const text = await res.text();
  return new URLSearchParams(text); // Contains oauth_token and oauth_token_secret
};
