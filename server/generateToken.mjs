import jwt from 'jsonwebtoken';
import secrets from './secrets.json';
import constants from './constants';

const tokens = {};

export function generateToken(iss) {
  let now = Math.floor(Date.now() / 1000);
  const token = tokens[iss];
  if (token && token.exp && (token.exp - now >= 1800)) {
    console.log('recycling token');
    return tokens[iss].token;
  }
  tokens[iss] = {
    exp: now + 3600,
    token: jwt.sign(
      {
        iss,
        scope: constants.SCOPE,
        aud: constants.aud,
        iat: now,
        exp: now + 3600,
      },
      { key: secrets.PRIVATE_KEY },
      { algorithm: 'RS256' })
  };

  return tokens[iss].token;
}
