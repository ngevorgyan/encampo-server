import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.serializeUser(function (user, done) {
  // done(null, user.id);
  console.log("11111111111111111111", user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  // Users.findById(obj, done);
  console.log("222222222222222222222222");
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GMAIL_WEB_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      callbackURL: `${process.env.GMAIL_REDIRECT_URIS}/auth/google/callback`,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

export default passport;
