import jwt from 'jsonwebtoken';
import secrets from './secrets.json';
import constants from './constants';

// cache generated token so we can can reuse them for
// different clients attempting to access the same calendar.
const tokens = {};

export function generateToken(iss) {
  let now = Math.floor(Date.now() / 1000);
  const token = tokens[iss];

  // if we already have a token for 'iss' (service account email)
  // and it is valid for more than half an hour, reuse that token
  if (token && token.exp && (token.exp - now >= 1800)) {
    return tokens[iss].token;
  }

  // Add a new token to our cache and use it
  tokens[iss] = {
    exp: now + 3600,
    token: jwt.sign(
      {
        iss,
        scope: constants.SCOPE,
        aud: constants.aud,
        iat: now,
        // Google does not allow tokens with a longer expiration date than an hour from now
        exp: now + 3600,
      },
      { key: secrets.PRIVATE_KEY },
      { algorithm: 'RS256' })
  };

  return tokens[iss].token;
}
