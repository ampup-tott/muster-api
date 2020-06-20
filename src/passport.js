'use strict';

import passport from 'passport';
import passportJWT from 'passport-jwt';
import Teacher from './models/Teacher';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    },
    async (req, payload, next) => {
      let user_token = {
        email: payload.email,
        id: payload.id,
        is_super_user: payload.is_super_user,
      };

      if (!user_token) {
        return next(new Error('Token is invalid'));
      }

      req.user_token = user_token;
      return next(null, user_token);
    }
  )
);

module.exports = passport;
