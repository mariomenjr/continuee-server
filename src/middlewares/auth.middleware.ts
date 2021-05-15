import passport from "passport";
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";

const { IDENTITY_ISSUER, IDENTITY_SECRET } = process.env;

const opts = {} as StrategyOptions;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = IDENTITY_SECRET;
opts.issuer = IDENTITY_ISSUER;

passport.use(new Strategy(opts, function(payload, done) {
  return done(null, false);
}));

export default passport;