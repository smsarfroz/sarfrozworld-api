import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import 'dotenv/config';
import prisma from './prisma/queries.js';
// import dotenv from "dotenv";

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    // return done(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    try {
      let user = await prisma.User.findOrCreate(profile.id, profile.displayName, profile.picture);
      let user2 = await prisma.User.
      console.log('done', user);
      return done(null, user);
    } catch (error) {
      console.error(error);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default "auth"