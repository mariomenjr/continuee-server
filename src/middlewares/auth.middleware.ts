import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const { IDENTITY_ISSUER, IDENTITY_AUDIENCE } = process.env;

console.info(`[issuer]: ${IDENTITY_ISSUER}`);

const authorize = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${IDENTITY_ISSUER}/.well-known/openid-configuration/jwks`
  }),
  audience: `${IDENTITY_AUDIENCE}`,
  issuer: `${IDENTITY_ISSUER}`,
  algorithms: [`RS256`]
});

export default authorize;