'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true
    },
    async (req, payload, next) => {
      console.log(payload);
      const user_token = await Teacher.find({
        email: payload.username,
        status: true
      })

      if (req.url.endsWith('logout')) {
        req.user_token = user_token;
        return next(null, payload);
      } else {
        if (!user_token || !user_token.status) {
          return next(new Error('Token is invalid'));
        }

        req.user_token = user_token;
        return next(null, user_token);
      }
    }
  )
);

module.exports = passport;