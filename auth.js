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
    console.log('accessToken, refreshToken', accessToken, refreshToken);
    try {
      let user = await prisma.findOrCreate(profile.id, profile.displayName, profile.picture);
      console.log('done', user);
      return done(null, user);
    } catch (error) {
      console.error(error);
    }
  }
));

passport.serializeUser(function(user, done) {
    console.log('user.id is serializeUser', user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log("user in deserializerUser", user);
    try {
      console.log('in deserializeUser');
      const user = await prisma.getUserbyId(id);
      console.log('user retrieved from db in deserializeUser', user, id);
      done(null, user);
    } catch (error) {
      done(error);
    }
});

export default "auth"

