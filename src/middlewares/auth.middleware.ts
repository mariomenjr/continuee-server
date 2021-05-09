import passport from "passport";
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";

const opts = {} as StrategyOptions;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `secret`;
opts.issuer = `identity.mariomenjr.com`;

passport.use(new Strategy(opts, function(payload, done) {
  return done(null, false);
}));

export default passport;