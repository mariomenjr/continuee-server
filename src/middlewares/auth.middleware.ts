import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const { IDENTITY_ISSUER, IDENTITY_SECRET } = process.env;

console.debug({ IDENTITY_ISSUER });

const authorize = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${IDENTITY_ISSUER}/.well-known/openid-configuration/jwks`
  }),
  audience: `continuee_api`,
  issuer: `${IDENTITY_ISSUER}`,
  algorithms: [`RS256`]
});

export default authorize;

// import passport from "passport";
// import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";

// const { IDENTITY_ISSUER, IDENTITY_SECRET } = process.env;

// const opts = {} as StrategyOptions;

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = IDENTITY_SECRET;
// // opts.issuer = IDENTITY_ISSUER;

// passport.use(new Strategy(opts, function(payload, done) {
//   console.debug({ payload });
//   return done(null, false);
// }));

// export default passport;